import { ClientOptions, ForecastResponse, AlertsResponse, ForecastType, AlertOptions } from './types';
/**
 * The main client
 *
 * ```typescript
 * const client = new Client();
 * ```
 */
declare class Client {
    private options;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    private getPoint;
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
}
export { Client };
