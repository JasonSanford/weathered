"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const cache_1 = __importDefault(require("./cache"));
class PointCache extends cache_1.default {
}
class StationsCache extends cache_1.default {
}
const defaultOptions = {
    userAgent: 'weathered package'
};
const API_ROOT = 'https://api.weather.gov/';
const processOptions = (options) => {
    const { area, latitude, longitude, urgency } = options;
    const params = new URLSearchParams();
    if (area) {
        params.append('area', Array.isArray(area) ? area.join(',') : area);
    }
    if (latitude !== undefined && longitude !== undefined) {
        params.append('point', `${latitude},${longitude}`);
    }
    if (urgency) {
        params.append('urgency', urgency);
    }
    return params;
};
/**
 * The main client
 *
 * ```typescript
 * const client = new Client();
 * ```
 */
class Client {
    constructor(options) {
        this.options = { ...defaultOptions, ...options };
        this.pointCache = new PointCache();
        this.stationsCache = new StationsCache();
    }
    getPath(path) {
        return this.getUrl(API_ROOT + path);
    }
    async getUrl(url) {
        const resp = await cross_fetch_1.default(url);
        return await resp.json();
    }
    async getPoint(latitude, longitude) {
        const cacheKey = `${latitude},${longitude}`;
        const potentialPointResponse = this.pointCache.get(cacheKey);
        if (potentialPointResponse) {
            return potentialPointResponse;
        }
        const path = `points/${latitude},${longitude}`;
        const pointResponse = await this.getPath(path);
        this.pointCache.set(cacheKey, pointResponse);
        return pointResponse;
    }
    getOptions() {
        return { ...this.options };
    }
    setOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
    }
    /**
     * Get weather alerts for a given area.
     *
     * ```typescript
     * const active = true;
     * const latitude = 35.6175667;
     * const longitude = -80.7709911;
     * const alerts = await client.getAlerts(active, { latitude, longitude });
     * ```
     */
    getAlerts(active, options) {
        const params = processOptions(options);
        const path = `alerts${active ? '/active' : ''}?${params}`;
        return this.getPath(path);
    }
    /**
     * Get a weather forecast for a given latitude and longitude.
     *
     * ```typescript
     * const latitude = 35.6175667;
     * const longitude = -80.7709911;
     * const forecast = await client.getForecast(latitude, longitude, 'baseline');
     * ```
     *
     */
    async getForecast(latitude, longitude, forecastType) {
        const pointResponse = await this.getPoint(latitude, longitude);
        const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
        const url = pointResponse.properties[forecastKey];
        return this.getUrl(url);
    }
    /**
     * Get the closest weather stations for a given latitude and longitude.
     *
     * ```typescript
     * const latitude = 35.6175667;
     * const longitude = -80.7709911;
     * const stations = await client.getStations(latitude, longitude);
     * ```
     *
     */
    async getStations(latitude, longitude) {
        const pointResponse = await this.getPoint(latitude, longitude);
        const stationsUrl = pointResponse.properties.observationStations;
        const potentionalStationsResponse = this.stationsCache.get(stationsUrl);
        if (potentionalStationsResponse) {
            return potentionalStationsResponse;
        }
        const stationsResponse = await this.getUrl(stationsUrl);
        this.stationsCache.set(stationsUrl, stationsResponse);
        return stationsResponse;
    }
    /**
     * Get the closest weather station for a given latitude and longitude.
     *
     * ```typescript
     * const latitude = 35.6175667;
     * const longitude = -80.7709911;
     * const stationOrNull = await client.getNearestStation(latitude, longitude);
     * ```
     *
     */
    async getNearestStation(latitude, longitude) {
        const stationsResponse = await this.getStations(latitude, longitude);
        if (stationsResponse.features.length > 0) {
            return stationsResponse.features[0];
        }
        return null;
    }
}
exports.Client = Client;
