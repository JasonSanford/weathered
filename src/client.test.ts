import { Client } from './';

describe('Client', () => {
  it('uses the default userAgent', () => {
    const client = new Client();
    expect(client.options.userAgent).toBe('weathered module version 0.0.0');
  });

  it('uses a custom userAgent', () => {
    const client = new Client({ userAgent: 'secret agent' });
    expect(client.options.userAgent).toBe('secret agent');
  });
});
