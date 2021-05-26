"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const defaultOptions = {
    userAgent: 'weathered module version 0.0.0'
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
    getAlerts(options) {
        const params = processOptions(options);
        const path = `alerts${options.active ? '/active' : ''}?${params}`;
        return this.getPath(path);
    }
    getPoint(latitude, longitude) {
        const path = `points/${latitude},${longitude}`;
        return this.getPath(path);
    }
    async getForecast(latitude, longitude, forecastType) {
        const pointResp = await this.getPoint(latitude, longitude);
        const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
        const url = pointResp.properties[forecastKey];
        return this.getUrl(url);
    }
}
exports.Client = Client;
