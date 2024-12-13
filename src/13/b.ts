const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n\n");

let total = 0;

input.forEach((input) => {
  const [astr, bstr, cstr] = input.split("\n");
  const [_1, ax, ay] = astr.match(/Button A: X\+(\d+), Y\+(\d+)/)!.map(Number);
  const [_2, bx, by] = bstr.match(/Button B: X\+(\d+), Y\+(\d+)/)!.map(Number);
  const [_3, priceX, priceY] = cstr
    .match(/Prize: X=(\d+), Y=(\d+)/)!
    .map((x) => Number(x) + 10000000000000);

  const D = ax * by - ay * bx;
  const Dx = priceX * by - priceY * bx;
  const Dy = ax * priceY - priceX * ay;

  const x = Dx / D;
  const y = Dy / D;

  if (Number.isInteger(x) && Number.isInteger(y)) {
    total += 3 * x + y;
  }
});

console.log(total);
