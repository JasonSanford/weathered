import { ClientOptions, ForecastResponse, AlertsResponse, ForecastType, AlertOptions } from './types';
declare class Client {
    options: ClientOptions;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    getAlerts(options: AlertOptions): Promise<AlertsResponse>;
    private getPoint;
    getForecast(latitude: number, longitude: number, forecastType: ForecastType): Promise<ForecastResponse>;
}
export { Client };
