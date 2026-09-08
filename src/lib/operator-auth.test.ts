import { describe, expect, it } from 'vitest';
import { validOperatorCredentials } from './operator-auth';

describe('operator access', () => {
  it('fails closed when configuration or header is absent', async () => {
    expect(await validOperatorCredentials(null, 'peter', 'secret')).toBe(false);
    expect(await validOperatorCredentials('Basic cGV0ZXI6c2VjcmV0')).toBe(false);
  });
  it('accepts only the configured user and complete password', async () => {
    expect(await validOperatorCredentials(`Basic ${btoa('peter:secret')}`, 'peter', 'secret')).toBe(true);
    expect(await validOperatorCredentials(`Basic ${btoa('peter:wrong')}`, 'peter', 'secret')).toBe(false);
    expect(await validOperatorCredentials('Basic !!!', 'peter', 'secret')).toBe(false);
  });
});
