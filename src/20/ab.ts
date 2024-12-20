const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const queue: [number, number, number][] = [];
outer: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "S") {
      queue.push([y, x, 0]);
      break outer;
    }
  }
}

const stepsMap = new Map<string, number>();

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

while (queue.length) {
  let [y, x, steps] = queue.shift()!;
  const key = `${y}_${x}`;
  if (stepsMap.has(key)) continue;
  stepsMap.set(key, steps);

  for (const [dx, dy] of DIRS) {
    const nx = x + dx;
    const ny = y + dy;
    if (grid[ny][nx] === "#") continue;
    queue.push([ny, nx, steps + 1]);
  }
}

const positions: [number, number, number][] = [];

stepsMap.entries().forEach(([key, val]) => {
  const [y, x] = key.split("_").map(Number);
  positions.push([y, x, val]);
});

let a = 0;
let b = 0;

for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const [ya, xa, stepsa] = positions[i];
    const [yb, xb, stepsb] = positions[j];

    const distance = Math.abs(ya - yb) + Math.abs(xa - xb);
    const secondsSaved = stepsb - stepsa - distance;

    if (secondsSaved < 100) continue;

    if (distance === 2) a++;
    if (distance <= 20) b++;
  }
}

console.log("a", a);
console.log("b", b);
