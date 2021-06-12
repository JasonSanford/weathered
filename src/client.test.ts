import { Client } from './';

describe('Client', () => {
  it('uses the default userAgent', () => {
    const client = new Client();
    expect(client.getOptions().userAgent).toBe('weathered package');
  });

  it('uses a custom userAgent', () => {
    const client = new Client({ userAgent: 'secret agent' });
    expect(client.getOptions().userAgent).toBe('secret agent');
  });

  it('can change userAgent', () => {
    const client = new Client();
    client.setOptions({ userAgent: 'a new userAgent' });
    expect(client.getOptions().userAgent).toBe('a new userAgent');
  });
});
