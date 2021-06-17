"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    constructor() {
        this.items = {};
    }
    get(key) {
        return this.items[key];
    }
    set(key, value) {
        this.items[key] = value;
    }
}
exports.default = Cache;
