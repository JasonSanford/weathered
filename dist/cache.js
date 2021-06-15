"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsCache = exports.PointCache = void 0;
class PointCache {
    constructor() {
        this.points = {};
    }
    get(key) {
        return this.points[key];
    }
    set(key, pointResponse) {
        this.points[key] = pointResponse;
    }
}
exports.PointCache = PointCache;
class StationsCache {
    constructor() {
        this.items = {};
    }
    get(key) {
        return this.items[key];
    }
    set(key, stationsResponse) {
        this.items[key] = stationsResponse;
    }
}
exports.StationsCache = StationsCache;
