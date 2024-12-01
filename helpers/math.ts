/**
 * Greatest Common Divisor
 * @returns The largest positive integer that DIVIDES both numbers without remainder
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b != 0) {
    const t = b;
    b = a % b;
    a = t;
  }

  return a;
}

/**
 * Least Common Multiple
 * @returns The smallest positive integer that is DIVISIBLE by BOTH a and b
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function lcmBulk(...numbers: number[]): number | null {
  if (numbers.length === 0) return null;

  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}
