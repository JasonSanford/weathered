import { PointResponse, StationsResponse } from './types';
declare class PointCache {
    private points;
    constructor();
    get(key: string): PointResponse | undefined;
    set(key: string, pointResponse: PointResponse): void;
}
declare class StationsCache {
    private items;
    constructor();
    get(key: string): StationsResponse | undefined;
    set(key: string, stationsResponse: StationsResponse): void;
}
export { PointCache, StationsCache };
