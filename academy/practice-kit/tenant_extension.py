"""Synthetic retail tenant extension, standard library only.

This is a deterministic tool-contract exercise, NOT an LLM, authentication
service, durable transaction system, MCP server or live marketing connector.
The constructor represents a trusted server boundary only for local tests.
"""
from dataclasses import dataclass
from datetime import date
from hashlib import sha256
import json
import threading
import time
from uuid import uuid4


@dataclass(frozen=True)
class TrustedContext:
    tenant: str = "teaching-tenant"
    actor: str = "operator-a"
    stores: frozenset = frozenset({"A"})


# Independent synthetic fixture; not a replacement for orders.csv's metric cohort.
MEMBERS = (
    {"ref": "p01", "store": "A", "last_purchase": "2026-07-10", "consent": True},
    {"ref": "p02", "store": "A", "last_purchase": "2026-07-21", "consent": False},
    {"ref": "p03", "store": "A", "last_purchase": "2026-08-29", "consent": True},
    {"ref": "p04", "store": "A", "last_purchase": "2026-06-25", "consent": True},
    {"ref": "p05", "store": "A", "last_purchase": None, "consent": True},
    {"ref": "p06", "store": "A", "last_purchase": "2026-01-01", "consent": True},
    {"ref": "p07", "store": "B", "last_purchase": "2026-07-11", "consent": True},
)


def canonical_digest(payload):
    return sha256(json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def bounded_int(value, lower, upper, code):
    if type(value) is not int or not lower <= value <= upper:
        raise ValueError(code)


class RetailExtension:
    """Read tools + simulated actions, isolated per service instance.

    Handles are UUIDs but UUID secrecy is not authentication. Production code
    needs verified identity, durable state and downstream reconciliation.
    """
    def __init__(self, context=None, budget_cents=5000, clock=time.monotonic):
        bounded_int(budget_cents, 0, 10_000_000, "INVALID_BUDGET")
        self.context = context or TrustedContext()
        self.clock, self.budget, self.spent = clock, budget_cents, 0
        self.segments, self.previews, self.requests, self.completed = {}, {}, {}, {}
        self.tags, self.coupons, self.audit = set(), [], []
        self.lock = threading.RLock()
        self.writes_enabled = True

    def _scope(self, store):
        if store not in self.context.stores or store not in {"A", "B"}:
            self._event("denied", reason="DENIED_SCOPE")
            raise PermissionError("DENIED_SCOPE")

    def _event(self, event, **fields):
        self.audit.append({"event": event, "tenant_ref": self.context.tenant,
                           "actor_ref": self.context.actor, **fields})

    def _segment(self, ref):
        segment = self.segments.get(ref)
        if segment is None:
            raise PermissionError("UNKNOWN_OR_UNAUTHORIZED_SEGMENT")
        self._scope(segment["store"])
        if self.clock() >= segment["expires"]:
            raise ValueError("STALE_SEGMENT")
        return segment

    def segment_members(self, store, as_of, inactive_days_min, inactive_days_max, limit=50):
        self._scope(store)
        if as_of != "2026-09-01":
            raise ValueError("FIXTURE_SNAPSHOT_REQUIRED")
        bounded_int(inactive_days_min, 1, 365, "INVALID_WINDOW")
        bounded_int(inactive_days_max, inactive_days_min, 365, "INVALID_WINDOW")
        bounded_int(limit, 1, 100, "INVALID_LIMIT")
        cutoff = date.fromisoformat(as_of)
        candidates, excluded = [], {"no_consent": 0, "unknown_purchase": 0, "outside_window": 0}
        for member in MEMBERS:
            if member["store"] != store:
                continue  # Do not expose excluded counts from unauthorized stores.
            if not member["consent"]:
                excluded["no_consent"] += 1
            elif not member["last_purchase"]:
                excluded["unknown_purchase"] += 1
            else:
                days = (cutoff - date.fromisoformat(member["last_purchase"])).days
                if inactive_days_min <= days <= inactive_days_max:
                    candidates.append(member["ref"])
                else:
                    excluded["outside_window"] += 1
        chosen = sorted(candidates)[:limit]
        with self.lock:
            ref = "segment-" + uuid4().hex
            self.segments[ref] = {"store": store, "members": tuple(chosen), "expires": self.clock()+300}
            self._event("segment_created", segment_ref=ref, count=len(chosen), snapshot=as_of)
        return {"segment_ref": ref, "member_refs": chosen, "count": len(chosen),
                "total_eligible": len(candidates), "truncated": len(candidates)>limit,
                "excluded": excluded, "metric_version": "inactive-valid-purchase-v1",
                "evidence_snapshot": "retail-fixture-2026-09-01", "as_of": as_of}

    def propose_operation(self, segment_ref, campaign_id):
        with self.lock:
            segment = self._segment(segment_ref)
            if campaign_id != "retail-reactivation-v1":
                raise ValueError("POLICY_UNAVAILABLE")
            count = len(segment["members"])
            # Fixed policy option, not model-generated business judgment.
            eligible = count > 0 and count*500 <= self.budget-self.spent
            self._event("proposal_read", segment_ref=segment_ref, eligible=eligible)
            return {"status": "proposal" if eligible else "no_eligible_proposal",
                    "segment_ref": segment_ref, "count": count,
                    "policy_version": campaign_id, "coupon_amount_cents": 500,
                    "maximum_total_cents": count*500, "executed": False,
                    "reasons": ["authorized snapshot", "consent and inactivity checked"],
                    "limitations": ["synthetic deterministic policy", "no causal uplift estimate"]}

    def preview_action(self, segment_ref, kind, amount_cents=0, tag=""):
        with self.lock:
            segment = self._segment(segment_ref)
            if not segment["members"]:
                raise ValueError("EMPTY_SEGMENT")
            if kind == "issue_coupon":
                bounded_int(amount_cents, 1, 1000, "INVALID_AMOUNT")
                if tag:
                    raise ValueError("UNEXPECTED_TAG")
                total = len(segment["members"])*amount_cents
            elif kind == "apply_tag":
                if tag != "reactivation_candidate" or type(amount_cents) is not int or amount_cents != 0:
                    raise ValueError("TAG_NOT_ALLOWED")
                total = 0
            else:
                raise PermissionError("TOOL_NOT_ALLOWED")
            if total > self.budget-self.spent:
                raise PermissionError("BUDGET_EXCEEDED")
            payload = {"tenant": self.context.tenant, "actor": self.context.actor,
                       "store": segment["store"], "members": list(segment["members"]),
                       "kind": kind, "amount_cents": amount_cents, "tag": tag,
                       "policy_version": "retail-reactivation-v1"}
            token, digest = "preview-"+uuid4().hex, canonical_digest(payload)
            self.previews[token] = {"payload": payload, "digest": digest,
                                    "expires": min(self.clock()+60, segment["expires"]), "total": total}
            self._event("preview", preview_ref=token, payload_digest=digest, kind=kind)
            return {"preview_ref": token, "payload_digest": digest, "count": len(segment["members"]),
                    "maximum_total_cents": total, "kind": kind, "requires_confirmation": True}

    def execute_action(self, preview_ref, payload_digest, request_id, confirmed=False):
        """confirmed=True stands in for trusted human authorization in this simulator.

        Never expose this boolean as a model-settable permission in production.
        """
        with self.lock:
            if not self.writes_enabled:
                raise PermissionError("WRITES_DISABLED")
            if confirmed is not True:
                raise PermissionError("CONFIRM_REQUIRED")
            if not isinstance(request_id, str) or not 1 <= len(request_id) <= 100:
                raise ValueError("INVALID_REQUEST_ID")
            preview = self.previews.get(preview_ref)
            if preview is None or preview["digest"] != payload_digest:
                raise PermissionError("PREVIEW_MISMATCH")
            payload = preview["payload"]
            self._scope(payload["store"])
            if request_id in self.requests:
                prior = self.requests[request_id]
                if prior["preview_ref"] != preview_ref or prior["digest"] != payload_digest:
                    raise PermissionError("IDEMPOTENCY_CONFLICT")
                return {**self.completed[preview_ref], "replayed": True}
            if preview_ref in self.completed:
                raise PermissionError("PREVIEW_ALREADY_COMMITTED")
            if self.clock() >= preview["expires"]:
                raise PermissionError("PREVIEW_EXPIRED")
            if preview["total"] > self.budget-self.spent:
                raise PermissionError("BUDGET_EXCEEDED")
            if payload["kind"] == "issue_coupon":
                self.spent += preview["total"]
                self.coupons.extend((request_id, member, payload["amount_cents"]) for member in payload["members"])
            else:
                self.tags.update((member, payload["tag"]) for member in payload["members"])
            result = {"status": "committed", "action_id": request_id,
                      "kind": payload["kind"], "count": len(payload["members"]),
                      "spent_cents": self.spent, "replayed": False}
            self.completed[preview_ref] = result
            self.requests[request_id] = {"preview_ref": preview_ref, "digest": payload_digest}
            self._event("committed", action_id=request_id, payload_digest=payload_digest,
                        policy_version=payload["policy_version"], kind=payload["kind"])
            return dict(result)

    def query_action(self, request_id):
        with self.lock:
            record = self.requests.get(request_id)
            return dict(self.completed[record["preview_ref"]]) if record else {"status": "not_found"}


def main():
    extension = RetailExtension()
    segment = extension.segment_members("A", "2026-09-01", 30, 90)
    proposal = extension.propose_operation(segment["segment_ref"], "retail-reactivation-v1")
    preview = extension.preview_action(segment["segment_ref"], "apply_tag", tag="reactivation_candidate")
    committed = extension.execute_action(preview["preview_ref"], preview["payload_digest"], "tag-demo-1", confirmed=True)
    replay = extension.execute_action(preview["preview_ref"], preview["payload_digest"], "tag-demo-1", confirmed=True)
    print(json.dumps({"mode": "deterministic_synthetic_extension_not_llm",
                      "segment": segment, "proposal": proposal,
                      "action": committed, "replay": replay,
                      "tags": sorted(extension.tags), "audit": extension.audit}, indent=2))


if __name__ == "__main__":
    main()
