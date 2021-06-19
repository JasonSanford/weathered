"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importDefault(require("./cache"));
describe('Cache', () => {
    it('returns undefined for missing keys', () => {
        const cache = new cache_1.default();
        expect(cache.get('missing')).toBe(undefined);
    });
    it('returns a cached value', () => {
        const cache = new cache_1.default();
        cache.set('hey', 'dude');
        expect(cache.get('hey')).toBe('dude');
    });
});
