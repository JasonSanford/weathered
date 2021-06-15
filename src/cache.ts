import { PointResponse, StationsResponse } from './types';

class PointCache {
  private points: { [key: string]: PointResponse; };

  constructor() {
    this.points = {};
  }

  get(key: string): PointResponse | undefined {
    return this.points[key];
  }

  set(key: string, pointResponse: PointResponse): void {
    this.points[key] = pointResponse;
  }
}

class StationsCache {
  private items: { [key: string]: StationsResponse; };

  constructor() {
    this.items = {};
  }

  get(key: string): StationsResponse | undefined {
    return this.items[key];
  }

  set(key: string, stationsResponse: StationsResponse): void {
    this.items[key] = stationsResponse;
  }
}

export { PointCache, StationsCache };
