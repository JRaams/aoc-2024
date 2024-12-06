import { detectLoop, findPlayer, findVisited } from "./grid";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const grid: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const [playerY, playerX] = findPlayer(grid);

const visited = findVisited(grid, playerY, playerX);

console.log("a", visited.size);

let cycles = 0;

Array.from(visited).forEach((v) => {
  const [y, x] = v.split("_").map(Number);
  if (grid[y][x] !== ".") return;
  grid[y][x] = "#";
  if (detectLoop(grid, playerY, playerX)) cycles++;
  grid[y][x] = ".";
});

console.log("b", cycles);
