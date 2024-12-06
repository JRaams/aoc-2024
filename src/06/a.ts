import { findPlayer, findVisited } from "./grid";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const [playerY, playerX] = findPlayer(grid);

console.log(findVisited(grid, playerY, playerX).size);
