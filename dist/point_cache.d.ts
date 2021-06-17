import { PointResponse } from './types';
declare class PointCache {
    private points;
    constructor();
    get(latitude: number, longitude: number): PointResponse | undefined;
    set(latitude: number, longitude: number, pointResponse: PointResponse): void;
}
export default PointCache;
