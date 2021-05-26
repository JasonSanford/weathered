import fetch from 'cross-fetch';

import { ClientOptions, PointResp, ForecastType, Area } from './types';

const defaultOptions: ClientOptions = {
  userAgent: 'weathered module version 0.0.0'
};

const API_ROOT = 'https://api.weather.gov/';

export default class Client {
  options: ClientOptions;
  
  constructor(options?: ClientOptions) {
    this.options = Object.assign(defaultOptions, options);
  }

  private getPath(path: string) {
    return this.getUrl(API_ROOT + path);
  }

  private async getUrl(url: string) {
    const resp = await fetch(url);
    return await resp.json();
  }

  getAlertsForPoint(latitude: number, longitude: number) {
    const path = `alerts?point=${latitude},${longitude}`;
    return this.getPath(path);
  }

  getActiveAlertsForPoint(latitude: number, longitude: number) {
    const path = `alerts/active?point=${latitude},${longitude}`;
    return this.getPath(path);
  }

  getActiveAlertsForArea(area: Area | Area[]) {
    const areaParam = Array.isArray(area) ? area.join(',') : area;
    const params = new URLSearchParams({ area: areaParam });
    const path = `alerts/active?${params.toString()}`;
    return this.getPath(path);
  }

  private getPoint(latitude: number, longitude: number) : Promise<PointResp> {
    const path = `points/${latitude},${longitude}`;
    return this.getPath(path);
  }

  async getForecastForPoint(latitude: number, longitude: number, forecastType: ForecastType) {
    const pointResp = await this.getPoint(latitude, longitude)
    const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
    const url = pointResp.properties[forecastKey];
    return this.getUrl(url);
  }
}
