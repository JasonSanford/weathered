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

/**
 * The main client
 *
 * ```typescript
 * const client = new Client();
 * ```
 */
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

  /**
   * Get weather alerts for a given area
   *
   * ```typescript
   * const active = true;
   * const latitude = 35.6175667;
   * const longitude = -80.7709911;
   * const alerts = await client.getAlerts(active, { latitude, longitude });
   * ```
   */
  getAlerts(active: boolean, options: AlertOptions) : Promise<AlertsResponse> {
    const params = processOptions(options);
    const path = `alerts${ active ? '/active' : ''}?${params}`;
    return this.getPath(path);
  }

  /**
   * Get a weather forecast for a given latitude and longitude
   *
   * ```typescript
   * const latitude = 35.6175667;
   * const longitude = -80.7709911;
   * const forecast = await client.getForecast(latitude, longitude, 'baseline');
   * ```
   * 
   */
  async getForecast(latitude: number, longitude: number, forecastType: ForecastType) : Promise<ForecastResponse> {
    const pointResp = await this.getPoint(latitude, longitude);
    const forecastKey = forecastType === 'hourly' ? 'forecastHourly' : 'forecast';
    const url = pointResp.properties[forecastKey];
    return this.getUrl(url);
  }
}

export { Client };
