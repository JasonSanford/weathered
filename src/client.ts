import fetch from 'cross-fetch';

import { ClientOptions, PointResponse, ForecastResponse, AlertsResponse, ForecastType, AlertOptions } from './types';

const defaultOptions: ClientOptions = {
  userAgent: 'weathered package'
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

class Client {
  private options: ClientOptions;
  
  constructor(options?: ClientOptions) {
    this.options = {...defaultOptions, ...options};
  }

  private getPath(path: string) {
    return this.getUrl(API_ROOT + path);
  }

  private async getUrl(url: string) {
    const resp = await fetch(url);
    return await resp.json();
  }

  private getPoint(latitude: number, longitude: number) : Promise<PointResponse> {
    const path = `points/${latitude},${longitude}`;
    return this.getPath(path);
  }

  getOptions() : ClientOptions {
    return {...this.options};
  }

  setOptions(newOptions: ClientOptions) : void {
    this.options = {...this.options, ...newOptions};
  }

  getAlerts(active: boolean, options: AlertOptions) : Promise<AlertsResponse> {
    const params = processOptions(options);
    const path = `alerts${ active ? '/active' : ''}?${params}`;
    return this.getPath(path);
  }

  async getForecast(latitude: number, longitude: number, forecastType: ForecastType) : Promise<ForecastResponse> {
    const pointResp = await this.getPoint(latitude, longitude);
    const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
    const url = pointResp.properties[forecastKey];
    return this.getUrl(url);
  }
}

export { Client };
