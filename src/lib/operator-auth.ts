/** Temporary single-operator protection. GBP OAuth/tenant access is separate. */
export async function validOperatorCredentials(header: string | null, user?: string, password?: string): Promise<boolean> {
  if (!user || !password || !header?.startsWith('Basic ')) return false;
  try {
    const supplied = atob(header.slice(6));
    const encoder = new TextEncoder();
    const [actual, expected] = await Promise.all([
      crypto.subtle.digest('SHA-256', encoder.encode(supplied)),
      crypto.subtle.digest('SHA-256', encoder.encode(`${user}:${password}`)),
    ]);
    const a = new Uint8Array(actual);
    const b = new Uint8Array(expected);
    return a.reduce((diff, byte, i) => diff | (byte ^ b[i]), 0) === 0;
  } catch {
    return false;
  }
}
