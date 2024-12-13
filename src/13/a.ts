const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n\n");

let total = 0;

input.forEach((input) => {
  const [a, b, c] = input.split("\n");
  const [_1, ax, ay] = a.match(/Button A: X\+(\d+), Y\+(\d+)/)!.map(Number);
  const [_2, bx, by] = b.match(/Button B: X\+(\d+), Y\+(\d+)/)!.map(Number);
  const [_3, px, py] = c.match(/Prize: X=(\d+), Y=(\d+)/)!.map(Number);

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
