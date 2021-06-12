import { ClientOptions, ForecastResponse, AlertsResponse, ForecastType, AlertOptions } from './types';
declare class Client {
    private options;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    private getPoint;
    getOptions(): ClientOptions;
    setOptions(newOptions: ClientOptions): void;
    getAlerts(active: boolean, options: AlertOptions): Promise<AlertsResponse>;
    getForecast(latitude: number, longitude: number, forecastType: ForecastType): Promise<ForecastResponse>;
}
export { Client };
