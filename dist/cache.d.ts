declare class Cache<T> {
    private items;
    constructor();
    get(key: string): T | undefined;
    set(key: string, value: T): void;
}
export default Cache;
