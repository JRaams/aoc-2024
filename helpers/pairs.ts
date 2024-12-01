export type Pair<T> = {
  left: T;
  right: T;
};

export function GeneratePairs<T>(array: T[]): Pair<T>[] {
  const result: Pair<T>[] = [];

  for (let i = 0; i < array.length; i += 2) {
    const [left, right] = array.slice(i, i + 2);
    result.push({ left, right });
  }

  return result;
}
