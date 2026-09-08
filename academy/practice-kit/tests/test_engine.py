import unittest
from datetime import date
from engine import load_orders, repeat_rate, TeachingService, ScriptedPlanner, run_teaching_loop


class DataTests(unittest.TestCase):
    def test_reconciliation(self):
        d = load_orders()
        self.assertEqual(d['raw_count'], d['accepted_count'] + len(d['duplicates']) + len(d['quarantine']))
        self.assertEqual(len(d['duplicates']), 1)
        self.assertEqual(len(d['quarantine']), 2)

    def test_repeat_rate_and_full_window(self):
        r = repeat_rate('A')
        self.assertEqual((r['numerator'], r['denominator']), (2, 5))
        self.assertEqual(r['rate'], .4)
        self.assertNotIn('m03', r['evidence_ids'])

    def test_refund_excluded(self):
        self.assertEqual(repeat_rate('A')['numerator'], 2)

    def test_store_scope(self):
        self.assertEqual(repeat_rate('B')['denominator'], 1)
        self.assertEqual(repeat_rate('B')['rate'], 1)

    def test_no_observed_cohort(self):
        self.assertIsNone(repeat_rate('A', date(2026, 7, 1))['rate'])

    def test_repeatable_read(self):
        self.assertEqual(load_orders(), load_orders())


class ActionTests(unittest.TestCase):
    def setUp(self):
        self.now = 100
        self.s = TeachingService(clock=lambda: self.now)

    def preview(self):
        return self.s.preview('A', ['m01', 'm02'], 1000)

    def test_read_denial(self):
        with self.assertRaisesRegex(PermissionError, 'DENIED_SCOPE'):
            self.s.read_metric('B')

    def test_preview_scope_denial(self):
        with self.assertRaisesRegex(PermissionError, 'DENIED_SCOPE'):
            self.s.preview('B', ['m05'], 100)

    def test_unapproved_member(self):
        with self.assertRaisesRegex(PermissionError, 'INELIGIBLE_MEMBER'):
            self.s.preview('A', ['m06'], 100)

    def test_duplicate_members(self):
        with self.assertRaisesRegex(ValueError, 'INVALID_MEMBERS'):
            self.s.preview('A', ['m01', 'm01'], 100)

    def test_amount_validation(self):
        for value in [-1, 0, True, 1.5, '100']:
            with self.subTest(value=value), self.assertRaises(ValueError):
                self.s.preview('A', ['m01'], value)

    def test_budget(self):
        with self.assertRaisesRegex(PermissionError, 'BUDGET_EXCEEDED'):
            self.s.preview('A', ['m01'], 20001)

    def test_confirmation(self):
        p = self.preview()
        with self.assertRaisesRegex(PermissionError, 'CONFIRM_REQUIRED'):
            self.s.execute('A', p['token'], p['fingerprint'])
        self.assertEqual(self.s.spent, 0)

    def test_bound_fingerprint(self):
        p = self.preview()
        with self.assertRaisesRegex(PermissionError, 'PREVIEW_MISMATCH'):
            self.s.execute('A', p['token'], 'modified', True)
        self.assertEqual(self.s.spent, 0)

    def test_expiry(self):
        p = self.preview()
        self.now += 61
        with self.assertRaisesRegex(PermissionError, 'PREVIEW_EXPIRED'):
            self.s.execute('A', p['token'], p['fingerprint'], True)

    def test_idempotent_replay(self):
        p = self.preview()
        a = self.s.execute('A', p['token'], p['fingerprint'], True)
        b = self.s.execute('A', p['token'], p['fingerprint'], True)
        self.assertFalse(a['replayed'])
        self.assertTrue(b['replayed'])
        self.assertEqual(self.s.spent, 2000)
        self.assertEqual(len(self.s.results), 1)

    def test_budget_rechecked_at_execution(self):
        p = self.s.preview('A', ['m01'], 15000)
        q = self.s.preview('A', ['m02'], 15000)
        self.s.execute('A', p['token'], p['fingerprint'], True)
        with self.assertRaisesRegex(PermissionError, 'BUDGET_EXCEEDED'):
            self.s.execute('A', q['token'], q['fingerprint'], True)

    def test_denial_is_audited(self):
        with self.assertRaises(PermissionError):
            self.s.read_metric('B')
        self.assertEqual(self.s.audit[-1]['event'], 'denied')


class LoopTests(unittest.TestCase):
    def test_scripted_loop(self):
        result = run_teaching_loop(ScriptedPlanner(), 'review', TeachingService())
        self.assertEqual(len(result['trace']), 1)

    def test_tool_allowlist(self):
        class BadPlanner:
            def choose(self, context):
                return {'tool': 'shell', 'arguments': {'command': 'not executed'}}
        with self.assertRaisesRegex(PermissionError, 'TOOL_NOT_ALLOWED'):
            run_teaching_loop(BadPlanner(), 'untrusted instruction', TeachingService())

    def test_step_limit(self):
        class Endless:
            def choose(self, context):
                return {'tool': 'read_metric', 'arguments': {'store': 'A'}}
        with self.assertRaisesRegex(RuntimeError, 'STEP_LIMIT'):
            run_teaching_loop(Endless(), 'review', TeachingService(), max_steps=2)


if __name__ == '__main__':
    unittest.main()
