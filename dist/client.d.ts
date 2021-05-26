import { ClientOptions, ForecastType, Area } from './types';
export default class Client {
    options: ClientOptions;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    getAlertsForPoint(latitude: number, longitude: number): Promise<any>;
    getActiveAlertsForPoint(latitude: number, longitude: number): Promise<any>;
    getActiveAlertsForArea(area: Area | Area[]): Promise<any>;
    private getPoint;
    getForecastForPoint(latitude: number, longitude: number, forecastType: ForecastType): Promise<any>;
}
