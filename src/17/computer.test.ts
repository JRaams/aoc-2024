import { expect, test } from "bun:test";
import { run } from "./computer";

test("If register C contains 9, the program 2,6 would set register B to 1", () => {
  const { B } = run(0, 0, 9, [2, 6]);
  expect(B).toBe(1);
});

test("If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.", () => {
  const { out } = run(10, 0, 0, [5, 0, 5, 1, 5, 4]);
  expect(out).toEqual([0, 1, 2]);
});

test("If register A contains 2024, the program 0,1,5,4,3,0 would output 4,2,5,6,7,7,7,7,3,1,0 and leave 0 in register A.", () => {
  const { A, out } = run(2024, 0, 0, [0, 1, 5, 4, 3, 0]);
  expect(out).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
  expect(A).toEqual(0);
});

test("If register B contains 29, the program 1,7 would set register B to 26.", () => {
  const { B } = run(0, 29, 0, [1, 7]);
  expect(B).toEqual(26);
});

test("If register B contains 2024 and register C contains 43690, the program 4,0 would set register B to 44354.", () => {
  const { B } = run(0, 2024, 43690, [4, 0]);
  expect(B).toEqual(44354);
});

test("If register A contains 729, the program 0,1,5,4,3,0 would output 4,6,3,5,6,3,5,2,1,0.", () => {
  const { out } = run(729, 0, 0, [0, 1, 5, 4, 3, 0]);
  expect(out).toEqual([4, 6, 3, 5, 6, 3, 5, 2, 1, 0]);
});
