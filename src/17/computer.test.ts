import { expect, test } from "bun:test";
import { run } from "./computer";

test("If register C contains 9, the program 2,6 would set register B to 1", () => {
  const { B } = run(0n, 0n, 9n, [2n, 6n]);
  expect(B).toBe(1n);
});

test("If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.", () => {
  const { out } = run(10n, 0n, 0n, [5n, 0n, 5n, 1n, 5n, 4n]);
  expect(out).toEqual([0n, 1n, 2n]);
});

test("If register A contains 2024, the program 0,1,5,4,3,0 would output 4,2,5,6,7,7,7,7,3,1,0 and leave 0 in register A.", () => {
  const { A, out } = run(2024n, 0n, 0n, [0n, 1n, 5n, 4n, 3n, 0n]);
  expect(out).toEqual([4n, 2n, 5n, 6n, 7n, 7n, 7n, 7n, 3n, 1n, 0n]);
  expect(A).toEqual(0n);
});

test("If register B contains 29, the program 1,7 would set register B to 26.", () => {
  const { B } = run(0n, 29n, 0n, [1n, 7n]);
  expect(B).toEqual(26n);
});

test("If register B contains 2024 and register C contains 43690, the program 4,0 would set register B to 44354.", () => {
  const { B } = run(0n, 2024n, 43690n, [4n, 0n]);
  expect(B).toEqual(44354n);
});

test("If register A contains 729, the program 0,1,5,4,3,0 would output 4,6,3,5,6,3,5,2,1,0.", () => {
  const { out } = run(729n, 0n, 0n, [0n, 1n, 5n, 4n, 3n, 0n]);
  expect(out).toEqual([4n, 6n, 3n, 5n, 6n, 3n, 5n, 2n, 1n, 0n]);
});
