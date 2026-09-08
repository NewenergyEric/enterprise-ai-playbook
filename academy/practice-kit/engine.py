"""AIelsen FDE teaching mechanisms. Synthetic data, no network, not a production agent."""
import csv
import hashlib
import json
import threading
import time
from datetime import date
from pathlib import Path

DATA = Path(__file__).parent / 'data'


def load_orders():
    """Keep raw files immutable; explicitly quarantine invalid rows and remove exact duplicates."""
    accepted, quarantine, duplicates, seen = [], [], [], {}
    with (DATA / 'orders.csv').open(encoding='utf-8', newline='') as stream:
        rows = list(csv.DictReader(stream))
    for row in rows:
        original = dict(row)
        try:
            row['day'] = date.fromisoformat(row['day'])
            row['amount_cents'] = int(row['amount_cents'])
            if row['amount_cents'] < 0 or row['status'] not in {'paid', 'refunded'}:
                raise ValueError('invalid amount or status')
            if row['store'] not in {'A', 'B'} or not row['member']:
                raise ValueError('invalid store or member')
            key = row['order_id']
            if key in seen:
                if row != seen[key]:
                    raise ValueError('conflicting duplicate ID')
                duplicates.append(original)
                continue
            seen[key] = row
            accepted.append(row)
        except (ValueError, KeyError) as error:
            quarantine.append({'row': original, 'reason': str(error)})
    return {'orders': accepted, 'quarantine': quarantine, 'duplicates': duplicates,
            'raw_count': len(rows), 'accepted_count': len(accepted)}


def repeat_rate(store='A', as_of=date(2026, 9, 1)):
    """Member's first qualifying order + full 30-day observation, repeats on a later day.

    Assumptions: dataset contains full purchase history; refunds excluded at snapshot date.
    Cohort is store-scoped, not a universal customer-lifetime definition.
    """
    if store not in {'A', 'B'}:
        raise ValueError('unknown store')
    members = {}
    for row in load_orders()['orders']:
        if row['store'] == store and row['status'] == 'paid' and row['day'] <= as_of:
            members.setdefault(row['member'], set()).add(row['day'])
    observed, repeat = [], []
    for member, days in members.items():
        first = min(days)
        if (as_of - first).days < 30:
            continue
        observed.append(member)
        if any(0 < (day - first).days <= 30 for day in days):
            repeat.append(member)
    return {'metric_version': 'store-first-purchase-30d-v1', 'as_of': str(as_of),
            'store': store, 'numerator': len(repeat), 'denominator': len(observed),
            'rate': len(repeat) / len(observed) if observed else None,
            'evidence_ids': sorted(observed)}


class TeachingService:
    """Trusted-boundary simulator: memory-only, process-local, synthetic participants.

    A real service needs identity verification, persistent transactional storage,
    durable audit, tenant isolation and downstream reconciliation.
    """
    def __init__(self, allowed_store='A', budget_cents=20000, clock=time.monotonic):
        self.allowed_store = allowed_store
        self.budget = budget_cents
        self.spent = 0
        self.previews = {}
        self.results = {}
        self.audit = []
        self.clock = clock
        self.lock = threading.Lock()
        self.counter = 0
        self.members = {'A': {'m01', 'm02', 'm04'}, 'B': {'m05'}}

    def _deny(self, code):
        self.audit.append({'event': 'denied', 'reason': code})
        raise PermissionError(code)

    def _scope(self, store):
        if store != self.allowed_store:
            self._deny('DENIED_SCOPE')

    def read_metric(self, store):
        self._scope(store)
        result = repeat_rate(store)
        self.audit.append({'event': 'metric_read', 'store': store,
                           'metric_version': result['metric_version']})
        return result

    def preview(self, store, members, amount_cents):
        self._scope(store)
        if not isinstance(amount_cents, int) or isinstance(amount_cents, bool) or amount_cents <= 0:
            raise ValueError('INVALID_AMOUNT')
        if not isinstance(members, list) or not members or len(set(members)) != len(members):
            raise ValueError('INVALID_MEMBERS')
        if not set(members).issubset(self.members.get(store, set())):
            self._deny('INELIGIBLE_MEMBER')
        total = len(members) * amount_cents
        with self.lock:
            if total > self.budget - self.spent:
                self._deny('BUDGET_EXCEEDED')
            payload = {'store': store, 'members': sorted(members), 'amount_cents': amount_cents}
            fingerprint = hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()
            self.counter += 1
            token = f'preview-{self.counter}'
            self.previews[token] = {'payload': payload, 'fingerprint': fingerprint,
                                    'expires': self.clock() + 60, 'total_cents': total}
        self.audit.append({'event': 'preview', 'token': token, 'fingerprint': fingerprint})
        return {'token': token, 'fingerprint': fingerprint, 'total_cents': total,
                'count': len(members), 'expires_in_seconds': 60}

    def execute(self, store, token, fingerprint, confirmed=False):
        self._scope(store)
        if confirmed is not True:
            self._deny('CONFIRM_REQUIRED')
        with self.lock:
            p = self.previews.get(token)
            if not p or p['fingerprint'] != fingerprint or p['payload']['store'] != store:
                self._deny('PREVIEW_MISMATCH')
            if token in self.results:
                self.audit.append({'event': 'replay', 'token': token})
                return {**self.results[token], 'replayed': True}
            if self.clock() > p['expires']:
                self._deny('PREVIEW_EXPIRED')
            if p['total_cents'] > self.budget - self.spent:
                self._deny('BUDGET_EXCEEDED')
            self.spent += p['total_cents']
            result = {'status': 'committed', 'token': token, 'count': len(p['payload']['members']),
                      'total_cents': p['total_cents'], 'spent_cents': self.spent, 'replayed': False}
            self.results[token] = result
        self.audit.append({'event': 'committed', 'token': token,
                           'total_cents': p['total_cents'], 'count': result['count']})
        return dict(result)


class ScriptedPlanner:
    """Deliberately NOT a language model. Replace through the choose(context) interface."""
    def choose(self, context):
        if not context['observations']:
            return {'tool': 'read_metric', 'arguments': {'store': context['store']}}
        return {'done': True, 'summary': 'Review the observed metric; no causal claim is established.'}


def run_teaching_loop(planner, task, service, store='A', max_steps=4):
    """Bounded teaching loop. Tools use a fixed allowlist; no eval, shell or network."""
    observations, trace = [], []
    for step in range(max_steps):
        decision = planner.choose({'task': task, 'store': store, 'observations': observations})
        if decision.get('done') is True:
            return {'mode': 'teaching_loop', 'trace': trace, 'summary': decision.get('summary', '')}
        tool, arguments = decision.get('tool'), decision.get('arguments', {})
        if tool != 'read_metric' or set(arguments) != {'store'}:
            raise PermissionError('TOOL_NOT_ALLOWED')
        result = service.read_metric(arguments['store'])
        observations.append(result)
        trace.append({'step': step, 'tool': tool, 'arguments': arguments, 'result': result})
    raise RuntimeError('STEP_LIMIT')
