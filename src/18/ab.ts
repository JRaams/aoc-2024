const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

function loadGrid(input: string[], size: number, bytes: number): boolean[][] {
  let grid: boolean[][] = Array.from({ length: size + 1 }, () =>
    new Array(size + 1).fill(false)
  );

  for (let i = 0; i < bytes; i++) {
    const [x, y] = input[i].trim().split(",").map(Number);
    if (grid[y]?.[x] === undefined) continue;
    grid[y][x] = true;
  }

  return grid;
}

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function findSteps(grid: boolean[][], size: number): number | null {
  const queue: [number, number, number][] = [[0, 0, 1]];
  const seen = new Set<string>();
  seen.add("0,0");

  while (queue.length) {
    const [x, y, steps] = queue.shift()!;

    for (const [dx, dy] of DIRS) {
      const nx = x + dx;
      const ny = y + dy;
      if (grid[ny]?.[nx] !== false) continue;

      if (ny === size && nx === size) {
        return steps;
      }

      const key = `${nx},${ny}`;
      if (seen.has(key)) continue;
      seen.add(key);

      queue.push([nx, ny, steps + 1]);
    }
  }

  return null;
}

const SIZE = 70;
const grid = loadGrid(input, SIZE, 1024);
const steps = findSteps(grid, SIZE);

console.log("a", steps);

let min = 1024;
let max = input.length - 1;

while (min < max) {
  let middle = Math.floor((min + max) / 2);
  const grid = loadGrid(input, SIZE, middle + 1);
  const steps = findSteps(grid, SIZE);

  if (steps === null) {
    max = middle;
  } else {
    min = middle + 1;
  }
}

console.log("b", input[min]);
