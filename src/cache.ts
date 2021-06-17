abstract class Cache<T> {
  private items: { [key: string]: T; };

  constructor() {
    this.items = {};
  }

  get(key: string): T | undefined {
    return this.items[key];
  }

  set(key: string, value: T): void {
    this.items[key] = value;
  }
}

export default Cache;
