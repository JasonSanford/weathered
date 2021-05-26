"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const defaultOptions = {
    userAgent: 'weathered module version 0.0.0'
};
const API_ROOT = 'https://api.weather.gov/';
class Client {
    constructor(options) {
        this.options = Object.assign(defaultOptions, options);
    }
    getPath(path) {
        return this.getUrl(API_ROOT + path);
    }
    async getUrl(url) {
        const resp = await cross_fetch_1.default(url);
        return await resp.json();
    }
    getAlertsForPoint(latitude, longitude) {
        const path = `alerts?point=${latitude},${longitude}`;
        return this.getPath(path);
    }
    getActiveAlertsForPoint(latitude, longitude) {
        const path = `alerts/active?point=${latitude},${longitude}`;
        return this.getPath(path);
    }
    getActiveAlertsForArea(area) {
        const areaParam = Array.isArray(area) ? area.join(',') : area;
        const params = new URLSearchParams({ area: areaParam });
        const path = `alerts/active?${params.toString()}`;
        return this.getPath(path);
    }
    getPoint(latitude, longitude) {
        const path = `points/${latitude},${longitude}`;
        return this.getPath(path);
    }
    async getForecastForPoint(latitude, longitude, forecastType) {
        const pointResp = await this.getPoint(latitude, longitude);
        const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
        const url = pointResp.properties[forecastKey];
        return this.getUrl(url);
    }
}
exports.default = Client;
