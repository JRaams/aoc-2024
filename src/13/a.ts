import { nums } from "../../helpers/input";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n\n");

let total = 0;

input.forEach((input) => {
  const [ax, ay, bx, by, px, py] = nums(input);

  const queue = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const seen = new Set<string>();

  while (queue.length) {
    const [x, y, pressA, pressB] = queue.shift()!;
    const key = `${x}_${y}_${pressA}_${pressB}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (pressA > 100 || pressB > 100 || x > px || y > py) continue;

    if (x === px && y === py) {
      total += pressA * 3 + pressB;
      break;
    }

    queue.push(
      [x + ax, y + ay, pressA + 1, pressB],
      [x + bx, y + by, pressA, pressB + 1]
    );
  }
});

console.log(total);
