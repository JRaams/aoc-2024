export function nums(input: string): number[] {
  const line = input.split("\n").join("");
  const matches = line.matchAll(/-?\d+/g);
  return Array.from(matches).flatMap(Number);
}
