import { DELTAS, loadGrid } from "./grid";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let { grid, playerY, playerX } = loadGrid(input);
let playerDir = 0;

const visited = new Set<string>();
visited.add(`${playerY}_${playerX}`);

while (true) {
  const delta = DELTAS[playerDir];
  const newTile = grid[playerY + delta[0]]?.[playerX + delta[1]];
  if (newTile === undefined) break;

  if (newTile === ".") {
    playerY += delta[0];
    playerX += delta[1];
    visited.add(`${playerY}_${playerX}`);
  } else {
    playerDir = (playerDir + 1) % 4;
  }
}

console.log(visited.size);
