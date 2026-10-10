"""Evaluate only offline engineering mechanisms; NOT LLM intelligence or security."""
import json
from engine import TeachingService, repeat_rate

results = []
for name, action, expected in [
    ('normal_metric', lambda s: s.read_metric('A')['rate'], .4),
    ('cross_store_denial', lambda s: s.read_metric('B'), 'DENIED_SCOPE'),
    ('unknown_member', lambda s: s.preview('A', ['unknown'], 100), 'INELIGIBLE_MEMBER'),
    ('over_budget', lambda s: s.preview('A', ['m01'], 30000), 'BUDGET_EXCEEDED'),
    ('missing_confirmation', lambda s: s.execute('A', 'x', 'x'), 'CONFIRM_REQUIRED')
]:
    service = TeachingService()
    try:
        actual = action(service)
    except (PermissionError, ValueError) as error:
        actual = str(error)
    results.append({'case': name, 'expected': expected, 'actual': actual, 'passed': actual == expected})
print(json.dumps({'mode': 'deterministic_mechanism_evaluation', 'cases': results}, indent=2))
raise SystemExit(0 if all(r['passed'] for r in results) else 1)
