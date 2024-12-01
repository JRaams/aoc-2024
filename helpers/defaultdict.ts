export function defaultDict<T>(factory: () => T): Record<string | symbol, T> {
  return new Proxy({} as Record<string | symbol, T>, {
    get(dict, key) {
      if (!Object.hasOwn(dict, key)) {
        dict[key] = factory();
      }

      return dict[key];
    },
  });
}
