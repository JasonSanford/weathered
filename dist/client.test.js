"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
describe('Client', () => {
    it('uses the default userAgent', () => {
        const client = new _1.Client();
        expect(client.options.userAgent).toBe('weathered module version 0.0.0');
    });
    it('uses a custom userAgent', () => {
        const client = new _1.Client({ userAgent: 'secret agent' });
        expect(client.options.userAgent).toBe('secret agent');
    });
});
