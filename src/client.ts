import fetch from 'cross-fetch';

import Cache from './cache';
import { ClientOptions, PointResponse, ForecastResponse, AlertsResponse, ForecastType, StationsResponse, Station, AlertOptions } from './types';

class PointCache extends Cache<PointResponse>{}
class StationsCache extends Cache<StationsResponse>{}

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
  private pointCache: PointCache;
  private stationsCache: StationsCache;
  
  constructor(options?: ClientOptions) {
    this.options = {...defaultOptions, ...options};
    this.pointCache = new PointCache();
    this.stationsCache = new StationsCache();
  }

  private getPath(path: string) {
    return this.getUrl(API_ROOT + path);
  }

  private async getUrl(url: string) {
    const resp = await fetch(url);
    return await resp.json();
  }

  private async getPoint(latitude: number, longitude: number): Promise<PointResponse> {
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

  getOptions(): ClientOptions {
    return {...this.options};
  }

  setOptions(newOptions: ClientOptions): void {
    this.options = {...this.options, ...newOptions};
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
  getAlerts(active: boolean, options: AlertOptions): Promise<AlertsResponse> {
    const params = processOptions(options);
    const path = `alerts${ active ? '/active' : ''}?${params}`;
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
  async getForecast(latitude: number, longitude: number, forecastType: ForecastType): Promise<ForecastResponse> {
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
  async getStations(latitude: number, longitude: number): Promise<StationsResponse> {
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
  async getNearestStation(latitude: number, longitude: number): Promise<Station | null> {
    const stationsResponse = await this.getStations(latitude, longitude);
    if (stationsResponse.features.length > 0) {
      return stationsResponse.features[0];
    }

    return null;
  }
}

export { Client };
