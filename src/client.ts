import fetch from 'cross-fetch';

import { ClientOptions, PointResp, ForecastType, Area, AlertOptions } from './types';

const defaultOptions: ClientOptions = {
  userAgent: 'weathered module version 0.0.0'
};

const API_ROOT = 'https://api.weather.gov/';

const processOptions = (options: AlertOptions) => {
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

  getAlerts(options: AlertOptions) {
    const params = processOptions(options);
    const path = `alerts${ options.active ? '/active' : ''}?${params}`;
    return this.getPath(path);
  }

  private getPoint(latitude: number, longitude: number) : Promise<PointResp> {
    const path = `points/${latitude},${longitude}`;
    return this.getPath(path);
  }

  async getForecast(latitude: number, longitude: number, forecastType: ForecastType) {
    const pointResp = await this.getPoint(latitude, longitude)
    const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
    const url = pointResp.properties[forecastKey];
    return this.getUrl(url);
  }
}
