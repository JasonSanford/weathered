"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
describe('Client', () => {
    it('uses the default userAgent', () => {
        const client = new _1.Client();
        expect(client.getOptions().userAgent).toBe('weathered package');
    });
    it('uses a custom userAgent', () => {
        const client = new _1.Client({ userAgent: 'secret agent' });
        expect(client.getOptions().userAgent).toBe('secret agent');
    });
    it('can change userAgent', () => {
        const client = new _1.Client();
        client.setOptions({ userAgent: 'a new userAgent' });
        expect(client.getOptions().userAgent).toBe('a new userAgent');
    });
});
