import unittest
from tenant_extension import RetailExtension, TrustedContext


class TenantExtensionTests(unittest.TestCase):
    def setUp(self):
        self.now = 1000
        self.x = RetailExtension(clock=lambda: self.now)

    def segment(self, **kw):
        args = dict(store="A", as_of="2026-09-01", inactive_days_min=30, inactive_days_max=90)
        args.update(kw)
        return self.x.segment_members(**args)

    def preview(self, kind="issue_coupon", amount=500, tag=""):
        s = self.segment()
        return self.x.preview_action(s["segment_ref"], kind, amount, tag)

    def execute(self, p, key="request-1", confirmed=True):
        return self.x.execute_action(p["preview_ref"], p["payload_digest"], key, confirmed)

    def test_segment_definition_and_exclusions(self):
        s = self.segment()
        self.assertEqual(s["member_refs"], ["p01", "p04"])
        self.assertEqual(s["excluded"], {"no_consent": 1, "unknown_purchase": 1, "outside_window": 2})

    def test_cross_store_denied(self):
        with self.assertRaisesRegex(PermissionError, "DENIED_SCOPE"):
            self.segment(store="B")

    def test_invalid_windows_and_limits(self):
        for args in [dict(inactive_days_min=True), dict(inactive_days_max=10), dict(limit=0), dict(limit=101)]:
            with self.subTest(args=args), self.assertRaises(ValueError):
                self.segment(**args)

    def test_snapshot_required(self):
        with self.assertRaisesRegex(ValueError, "FIXTURE_SNAPSHOT"):
            self.segment(as_of="2026-09-02")

    def test_truncation_is_reported(self):
        s = self.segment(limit=1)
        self.assertEqual(s["count"], 1)
        self.assertEqual(s["total_eligible"], 2)
        self.assertTrue(s["truncated"])

    def test_proposal_has_no_action(self):
        s = self.segment()
        p = self.x.propose_operation(s["segment_ref"], "retail-reactivation-v1")
        self.assertFalse(p["executed"])
        self.assertEqual(p["maximum_total_cents"], 1000)
        self.assertEqual((self.x.spent, self.x.coupons, self.x.tags), (0, [], set()))

    def test_no_silent_policy_fallback(self):
        with self.assertRaisesRegex(ValueError, "POLICY_UNAVAILABLE"):
            self.x.propose_operation(self.segment()["segment_ref"], "unknown-policy")

    def test_segment_scope_and_expiry(self):
        ref = self.segment()["segment_ref"]
        other = RetailExtension(TrustedContext(tenant="other"))
        with self.assertRaisesRegex(PermissionError, "UNAUTHORIZED_SEGMENT"):
            other.propose_operation(ref, "retail-reactivation-v1")
        self.now += 300
        with self.assertRaisesRegex(ValueError, "STALE_SEGMENT"):
            self.x.propose_operation(ref, "retail-reactivation-v1")

    def test_confirmation_required(self):
        with self.assertRaisesRegex(PermissionError, "CONFIRM_REQUIRED"):
            self.execute(self.preview(), confirmed=False)
        self.assertEqual(self.x.spent, 0)

    def test_payload_tampering(self):
        p = self.preview()
        with self.assertRaisesRegex(PermissionError, "PREVIEW_MISMATCH"):
            self.x.execute_action(p["preview_ref"], "changed", "r", True)

    def test_replay_and_conflicting_key(self):
        p = self.preview()
        self.execute(p)
        self.assertTrue(self.execute(p)["replayed"])
        self.assertEqual(self.x.spent, 1000)
        with self.assertRaisesRegex(PermissionError, "IDEMPOTENCY_CONFLICT"):
            self.execute(self.preview(amount=600))
        with self.assertRaisesRegex(PermissionError, "ALREADY_COMMITTED"):
            self.execute(p, key="different-key")

    def test_budget_rechecked(self):
        self.x = RetailExtension(budget_cents=1000)
        a, b = self.preview(), self.preview()
        self.execute(a, key="a")
        with self.assertRaisesRegex(PermissionError, "BUDGET_EXCEEDED"):
            self.execute(b, key="b")

    def test_tags_allowed_and_idempotent(self):
        p = self.preview("apply_tag", 0, "reactivation_candidate")
        self.execute(p)
        self.execute(p)
        self.assertEqual(len(self.x.tags), 2)
        self.assertEqual(self.x.spent, 0)
        with self.assertRaisesRegex(ValueError, "TAG_NOT_ALLOWED"):
            self.preview("apply_tag", 0, "arbitrary")

    def test_preview_expires(self):
        p = self.preview()
        self.now += 60
        with self.assertRaisesRegex(PermissionError, "PREVIEW_EXPIRED"):
            self.execute(p)

    def test_stop_writes_preserves_read_and_query(self):
        p = self.preview()
        self.execute(p)
        self.x.writes_enabled = False
        self.assertEqual(self.x.query_action("request-1")["status"], "committed")
        self.assertEqual(self.segment()["count"], 2)
        with self.assertRaisesRegex(PermissionError, "WRITES_DISABLED"):
            self.execute(self.preview(), key="new")

    def test_audit_fields_and_no_phone(self):
        self.execute(self.preview())
        event = self.x.audit[-1]
        self.assertEqual(event["actor_ref"], "operator-a")
        self.assertIn("payload_digest", event)
        self.assertNotIn("members", event)


if __name__ == "__main__":
    unittest.main()
