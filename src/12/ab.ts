const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const grid: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const regions = new Map<number, [number, number][]>();

const perimeters: number[][] = Array.from({ length: grid.length }, () =>
  new Array(grid[0].length).fill(0)
);

const corners: number[][] = Array.from({ length: grid.length }, () =>
  new Array(grid[0].length).fill(0)
);

const seen = new Set<string>();
let regionId = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];

    // 1. perimeters
    const top = grid[y - 1]?.[x];
    const right = grid[y][x + 1];
    const bottom = grid[y + 1]?.[x];
    const left = grid[y][x - 1];

    for (const dir of [top, right, bottom, left]) {
      if (dir !== c) perimeters[y][x]++;
    }

    // 2. corners
    const topLeft = grid[y - 1]?.[x - 1];
    const topRight = grid[y - 1]?.[x + 1];
    const bottomRight = grid[y + 1]?.[x + 1];
    const bottomLeft = grid[y + 1]?.[x - 1];

    for (const { a, b, corner } of [
      { a: top, b: left, corner: topLeft },
      { a: top, b: right, corner: topRight },
      { a: bottom, b: right, corner: bottomRight },
      { a: bottom, b: left, corner: bottomLeft },
    ]) {
      if (a !== c && b !== c) corners[y][x]++;
      else if (a === c && b === c && corner !== c) corners[y][x]++;
    }

    // 3. region
    const queue: [number, number][] = [[y, x]];
    const region: [number, number][] = [];
    regions.set(regionId++, region);

    while (queue.length) {
      const [ny, nx] = queue.pop()!;
      const key = `${ny}_${nx}`;

      if (seen.has(key) || grid[ny]?.[nx] !== grid[y][x]) {
        continue;
      }

      region.push([ny, nx]);
      seen.add(key);
      queue.push([ny - 1, nx], [ny, nx + 1], [ny + 1, nx], [ny, nx - 1]);
    }
  }
}

let a = 0;
let b = 0;

regions.values().forEach((region) => {
  const area = region.length;

  const perimeter = region
    .map(([y, x]) => perimeters[y][x])
    .reduce((a, b) => a + b, 0);

  const sides = region
    .map(([y, x]) => corners[y][x])
    .reduce((a, b) => a + b, 0);

  a += area * perimeter;
  b += area * sides;
});

console.log("a", a);
console.log("b", b);
