import * as sha256 from "crypto-js/sha256";
import * as base64 from "crypto-js/enc-base64";
import * as secureRandom from "secure-random";

const mask =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";

export function random(size: number): string {
  let value = "";

  const bytes = secureRandom(size);
  const scale = 256 / mask.length; // 256 = 0 to 0xFF (randomBytes)

  for (let i = 0; i < size; i++) {
    value += mask.charAt(Math.floor(bytes[i] / scale));
  }

  return value;
}

function hash(str: string): string {
  return base64.stringify(sha256(str));
}

function base64url(str: string): string {
  return str
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createVerifier(length: number = 128): string {
  if (length < 43 || length > 128) {
    throw new Error(`expected length ${length} between 43 and 128`);
  }

  return random(length);
}

export function createChallenge(verifier: string): string {
  return base64url(hash(verifier));
}

interface CodePair {
  codeVerifier: string;
  codeChallenge: string;
}

export function create(length: number = 128): CodePair {
  const verifier = createVerifier(length);
  const challenge = createChallenge(verifier);

  return {
    codeVerifier: verifier,
    codeChallenge: challenge
  };
}
