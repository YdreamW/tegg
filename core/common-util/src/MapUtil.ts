export class MapUtil {
  static getOrStore<K, V>(map: Map<K, V>, key: K, value: V): V {
    if (!map.has(key)) {
      map.set(key, value);
    }
    return map.get(key)!;
  }

  // Returns the value for a key, or inserts and returns defaultValue when missing.
  static getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    const val = map.get(key);
    if (val === undefined) {
      // 直接修改入参 map，可能带来副作用
      map.set(key, defaultValue);
      return defaultValue;
    }
    return val;
  }
}
