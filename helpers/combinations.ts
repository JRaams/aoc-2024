export function* combinationsN<T>(input: T[], length: number): Generator<T[]> {
  if (length === 1) {
    for (const item of input) {
      yield [item];
    }
    return;
  }

  for (let i = 0; i <= input.length - length; i++) {
    for (const item of combinationsN(input.slice(i + 1), length - 1)) {
      yield [input[i], ...item];
    }
  }
}

export function* allCombinations<T>(input: T[]): Generator<T[]> {
  if (input.length === 1) {
    yield input;
    return;
  }

  yield [input[0]];
  for (const c of allCombinations(input.slice(1))) {
    yield c;
    yield [input[0], ...c];
  }
}

export function* orderedCombinations<T>(input: T[]): Generator<T[]> {
  for (let i = 1; i <= input.length; i++) {
    yield* combinationsN(input, i);
  }
}

export function* cartesianProduct<T>(
  head: T[],
  ...tail: T[][]
): Generator<T[]> {
  const remainder = tail.length
    ? cartesianProduct(tail[0], ...tail.slice(1))
    : [[]];

  for (const r of remainder) {
    for (const h of head) {
      yield [h, ...r];
    }
  }
}
