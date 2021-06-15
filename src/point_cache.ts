import { PointResponse } from './types';

const cacheKey = (lat: number, lng: number) => `${lat},${lng}`;

class PointCache {
  private points: { [key: string]: PointResponse; };

  constructor() {
    this.points = {};
  }

  get(latitude: number, longitude: number): PointResponse | undefined {
    return this.points[cacheKey(latitude, longitude)];
  }

  set(latitude: number, longitude: number, pointResponse: PointResponse): void {
    this.points[cacheKey(latitude, longitude)] = pointResponse;
  }
}

export default PointCache;
