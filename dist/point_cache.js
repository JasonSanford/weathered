"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheKey = (lat, lng) => `${lat},${lng}`;
class PointCache {
    constructor() {
        this.points = {};
    }
    get(latitude, longitude) {
        return this.points[cacheKey(latitude, longitude)];
    }
    set(latitude, longitude, pointResponse) {
        this.points[cacheKey(latitude, longitude)] = pointResponse;
    }
}
exports.default = PointCache;
