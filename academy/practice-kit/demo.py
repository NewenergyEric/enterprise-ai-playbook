import json
from engine import TeachingService, ScriptedPlanner, run_teaching_loop

service = TeachingService()
print(json.dumps(run_teaching_loop(ScriptedPlanner(), 'Review store A retention', service), indent=2))
preview = service.preview('A', ['m01', 'm02'], 1000)
first = service.execute('A', preview['token'], preview['fingerprint'], confirmed=True)
retry = service.execute('A', preview['token'], preview['fingerprint'], confirmed=True)
print(json.dumps({'first': first, 'retry': retry, 'audit': service.audit}, indent=2))
print('SYNTHETIC DEMO: no model call, no external action, no real customer records.')
