import { ClientOptions, ForecastResponse, AlertsResponse, ForecastType, ObservationResponse, AlertOptions } from './types';
/**
 * The main client
 *
 * ```typescript
 * const client = new Client();
 * ```
 */
declare class Client {
    private options;
    private pointCache;
    private stationsCache;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    private getPoint;
    private getStations;
    getOptions(): ClientOptions;
    setOptions(newOptions: ClientOptions): void;
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
    getAlerts(active: boolean, options: AlertOptions): Promise<AlertsResponse>;
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
    getForecast(latitude: number, longitude: number, forecastType: ForecastType): Promise<ForecastResponse>;
    /**
     * Get the latest weather observations for a given latitude and longitude.
     * This method finds the nearest observation station, which could be near
     * or far, and returns its latest observation.
     *
     * ```typescript
     * const latitude = 35.6175667;
     * const longitude = -80.7709911;
     * const observations = await client.getLatestObservations(latitude, longitude);
     * ```
     *
     */
    getLatestObservations(latitude: number, longitude: number): Promise<ObservationResponse>;
}
export { Client };
