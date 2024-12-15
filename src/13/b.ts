import { nums } from "../../helpers/input";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n\n");

let total = 0;

input.forEach((input) => {
  let [ax, ay, bx, by, px, py] = nums(input);

  px += 10000000000000;
  py += 10000000000000;

  const D = ax * by - ay * bx;
  const Dx = px * by - py * bx;
  const Dy = ax * py - px * ay;

  const x = Dx / D;
  const y = Dy / D;

  if (Number.isInteger(x) && Number.isInteger(y)) {
    total += 3 * x + y;
  }
});

console.log(total);
