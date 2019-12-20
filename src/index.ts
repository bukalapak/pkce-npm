import * as randomBytes from "randombytes";
import * as createHash from "create-hash";
import base64url from "base64url";

const mask =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";

function random(size: number): string {
  let value = "";

  const bytes = randomBytes(size);
  const scale = 256 / mask.length; // 256 = 0 to 0xFF (randomBytes)

  for (let i = 0; i < size; i++) {
    value += mask.charAt(Math.floor(bytes[i] / scale));
  }

  return value;
}

function hash(str: string): string {
  return createHash("sha256")
    .update(str)
    .digest("base64");
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
