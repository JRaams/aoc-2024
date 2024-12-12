const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const grid: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const regions = new Map<number, [number, number][]>();

const seen = new Set<string>();

const perimiters: number[][] = Array.from({ length: grid.length }, () =>
  new Array(grid[0].length).fill(0)
);

const corners: number[][] = Array.from({ length: grid.length }, () =>
  new Array(grid[0].length).fill(0)
);

let regionId = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    const top = grid[y - 1]?.[x];
    const right = grid[y][x + 1];
    const bottom = grid[y + 1]?.[x];
    const left = grid[y][x - 1];

    if (top !== c) perimiters[y][x]++;
    if (right !== c) perimiters[y][x]++;
    if (bottom !== c) perimiters[y][x]++;
    if (left !== c) perimiters[y][x]++;

    if (top !== c && left !== c) corners[y][x]++;
    if (top === c && left === c && grid[y - 1]?.[x - 1] !== c) corners[y][x]++;

    if (top !== c && right !== c) corners[y][x]++;
    if (top === c && right === c && grid[y - 1]?.[x + 1] !== c) corners[y][x]++;

    if (bottom !== c && right !== c) corners[y][x]++;
    if (bottom === c && right === c && grid[y + 1]?.[x + 1] !== c)
      corners[y][x]++;

    if (bottom !== c && left !== c) corners[y][x]++;
    if (bottom === c && left === c && grid[y + 1]?.[x - 1] !== c)
      corners[y][x]++;

    const key = `${y}_${x}`;
    if (seen.has(key)) continue;

    const queue: [number, number][] = [[y, x]];

    const region: [number, number][] = [];
    regions.set(regionId++, region);

    while (queue.length) {
      const [ny, nx] = queue.pop()!;

      if (
        grid[ny] === undefined ||
        seen.has(`${ny}_${nx}`) ||
        grid[ny][nx] !== grid[y][x]
      ) {
        continue;
      }

      region.push([ny, nx]);
      seen.add(`${ny}_${nx}`);
      queue.push([ny - 1, nx], [ny, nx + 1], [ny + 1, nx], [ny, nx - 1]);
    }
  }
}

let a = 0;
let b = 0;

regions.values().forEach((region) => {
  const area = region.length;

  const perimiter = region
    .map(([y, x]) => perimiters[y][x])
    .reduce((a, b) => a + b, 0);

  const sides = region
    .map(([y, x]) => corners[y][x])
    .reduce((a, b) => a + b, 0);

  a += area * perimiter;
  b += area * sides;
});

console.log("a", a);
console.log("b", b);
