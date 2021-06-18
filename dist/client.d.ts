import { ClientOptions, ForecastResponse, AlertsResponse, ForecastType, StationsResponse, Station, ObservationResponse, ObservationsResponse, AlertOptions } from './types';
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
    getOptions(): ClientOptions;
    setOptions(newOptions: ClientOptions): void;
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
    getAlerts(active: boolean, options: AlertOptions): Promise<AlertsResponse>;
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
    getForecast(latitude: number, longitude: number, forecastType: ForecastType): Promise<ForecastResponse>;
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
    getStations(latitude: number, longitude: number): Promise<StationsResponse>;
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
    getNearestStation(latitude: number, longitude: number): Promise<Station | null>;
    /**
     * Get weather observations for a given station.
     *
     * ```typescript
     * const observations = await client.getStationObservations('KSFO');
     * ```
     */
    getStationObservations(stationId: string): Promise<ObservationsResponse>;
    /**
     * Get latest weather observation for a given station.
     *
     * ```typescript
     * const latestObservation = await client.getLatestStationObservations('KSFO');
     * ```
     */
    getLatestStationObservations(stationId: string): Promise<ObservationResponse>;
}
export { Client };
