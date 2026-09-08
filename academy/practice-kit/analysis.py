import json
from engine import repeat_rate, load_orders

data = load_orders()
print(json.dumps({'raw': data['raw_count'], 'accepted': data['accepted_count'],
                  'duplicates': len(data['duplicates']), 'quarantine': len(data['quarantine']),
                  'store_A_30d': repeat_rate('A')}, indent=2))
t0, t1, c0, c1 = .20, .28, .18, .23
print(f'Synthetic DiD: {((t1-t0)-(c1-c0))*100:.1f} percentage points')
print('Causal interpretation requires identification assumptions; significance is not calculated.')
