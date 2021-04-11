import { ClientOptions, PointResp, ForecastType } from './types';
export default class Client {
    options: ClientOptions;
    constructor(options?: ClientOptions);
    private getPath;
    private getUrl;
    getAlertsForPoint(latitude: number, longitude: number): Promise<any>;
    getActiveAlertsForPoint(latitude: number, longitude: number): Promise<any>;
    getPoint(latitude: number, longitude: number): Promise<PointResp>;
    getForecastForPoint(latitude: number, longitude: number, forecastType: ForecastType): Promise<any>;
}
