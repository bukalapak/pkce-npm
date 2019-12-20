import * as test from 'tape';
import { create, createVerifier, createChallenge } from "../src";

const verifierPattern = /^[A-Za-z\d\-._~]{43,128}$/;
const base64Pattern = /[=+\/]/;

test('createVerifier', (t) => {
  const d128 = createVerifier();
  const v128 = createVerifier(128);
  const v64 = createVerifier(64);
  const v43 = createVerifier(43);

  t.equal(128, d128.length);
  t.equal(128, v128.length);
  t.equal(64, v64.length);
  t.equal(43, v43.length);

  t.ok(d128.match(verifierPattern))
  t.ok(v128.match(verifierPattern))
  t.ok(v64.match(verifierPattern))
  t.ok(v43.match(verifierPattern))
  t.end();
});

test('createVerifier < 43', (t) => {
  t.throws(() => createVerifier(32));
  t.end();
});

test('createVerifier > 128', (t) => {
  t.throws(() => createVerifier(256));
  t.end();
});

test('createChallenge', (t) => {
  const verifier = createVerifier();
  const challenge = createChallenge(verifier);

  t.notOk(challenge.match(base64Pattern));
  t.end();
});

test('create', (t) => {
  const { codeVerifier: v128, codeChallenge: c128 } = create();
  const { codeVerifier: v64, codeChallenge: c64 } = create(64);

  t.equal(128, v128.length);
  t.equal(64, v64.length);

  t.ok(v128.match(verifierPattern))
  t.ok(v64.match(verifierPattern))

  t.notOk(c128.match(base64Pattern));
  t.notOk(c64.match(base64Pattern));

  t.end();
});
