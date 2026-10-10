import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicHttpsUrl, leadConfiguration } from '../lib/lead-endpoint.ts';
test('valid HTTPS endpoint and notice are required together', () => assert.equal(leadConfiguration('https://example.com/leads','https://example.com/privacy').leadEndpoint,'https://example.com/leads'));
test('missing notice disables collection', () => assert.equal(leadConfiguration('https://example.com/leads','').leadEndpoint,''));
test('secrets and fragments are never serialized', () => { for(const u of ['https://user:pass@example.com/leads','https://example.com/leads?key=example','https://example.com/leads#private'])assert.equal(publicHttpsUrl(u),''); });
test('non-HTTPS and production loopback are rejected', () => { for(const u of ['http://example.com/leads','https://127.0.0.1/leads','http://localhost/leads','javascript:alert(1)'])assert.equal(publicHttpsUrl(u),''); });
test('loopback development must be explicit', () => assert.equal(publicHttpsUrl('http://127.0.0.1:8000/leads',true),'http://127.0.0.1:8000/leads'));
