export function* permute<T>(input: T[]) {
  const length = input.length;
  const c = Array(length).fill(0);
  let i = 1;
  let k: number;
  let p;

  yield input.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = input[i];
      input[i] = input[k];
      input[k] = p;
      ++c[i];
      i = 1;
      yield input.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}
