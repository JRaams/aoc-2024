import { DELTAS, loadGrid } from "./grid";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let { grid, playerY, playerX } = loadGrid(input);

function gridHasCycle(g: string[][], py: number, px: number): boolean {
  let playerDir = 0;

  const visited = new Set<string>();
  visited.add(`${playerY}_${playerX}_${playerDir}`);

  while (true) {
    const delta = DELTAS[playerDir];
    const newTile = g[py + delta[0]]?.[px + delta[1]];
    const key = `${py + delta[0]}_${px + delta[1]}_${playerDir};`;
    if (visited.has(key)) return true;

    if (newTile === undefined) return false;

    if (newTile === ".") {
      py += delta[0];
      px += delta[1];
      visited.add(key);
    } else {
      playerDir = (playerDir + 1) % 4;
    }
  }
}

let cycles = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const gridCopy = structuredClone(grid);

    if (gridCopy[y][x] !== ".") continue;
    gridCopy[y][x] = "#";

    if (gridHasCycle(gridCopy, playerY, playerX)) {
      cycles++;
    }
  }
}

console.log(cycles);
