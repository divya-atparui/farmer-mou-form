// Utility functions for PKCE (Proof Key for Code Exchange) implementation

/**
 * Generates a random integer between min and max (inclusive)
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates a code verifier string using the specified character set
 */
export function generateCodeVerifier(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let codeVerifier = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    codeVerifier += characters.charAt(randomIndex);
  }
  return codeVerifier;
}

/**
 * Generates SHA-256 hash of the input string
 */
export async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

/**
 * Base64URL encodes the input buffer
 */
export function base64UrlEncode(buffer: ArrayBuffer): string {
  const padding = "=".repeat((4 - (buffer.byteLength % 4)) % 4);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") + padding;
}

/**
 * Generates a code challenge from a code verifier
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hashedBuffer = await sha256(codeVerifier);
  return base64UrlEncode(hashedBuffer);
}

/**
 * Generates a complete PKCE pair (code verifier and challenge)
 */
export async function generatePKCEPair(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const randomByte = randomIntFromInterval(32, 96);
  const codeVerifier = generateCodeVerifier(randomByte);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}