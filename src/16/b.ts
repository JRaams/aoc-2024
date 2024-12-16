import { Heap } from "../../helpers/heap";
import { Node } from "./node";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const startx = 1;
const starty = input.length - 2;
const endx = input[0].length - 2;
const endy = 1;

const visited = new Map<string, number>();
const openSet = new Heap<Node>(
  (a, b) => a.steps - b.steps,
  [new Node(starty, startx, 0, 1, 0, endy - starty + (endx - startx), [])]
);

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const tiles = new Set<string>();
let max = Number.MAX_SAFE_INTEGER;

while (!openSet.isEmpty()) {
  const node = openSet.pop()!;
  const { y, x, dy, dx, steps, path: oldPath } = node;
  const path = oldPath.slice();
  path.push(node);

  const key = node.toString();
  if (!visited.has(key)) {
    visited.set(key, Number.MAX_SAFE_INTEGER);
  }

  const maxSteps = visited.get(key)!;
  if (steps > maxSteps) continue;
  visited.set(key, steps);

  if (y === endy && x === endx) {
    if (steps > max) continue;
    max = steps;

    tiles.add(`${y}_${x}`);
    node.path.forEach((p) => {
      tiles.add(`${p.y}_${p.x}`);
    });

    continue;
  }

  for (const [newDy, newDx] of DIRECTIONS) {
    const sameDir = newDy === dy && newDx === dx;

    const nextY = y + newDy;
    const nextX = x + newDx;
    if (input[nextY]?.[nextX] === undefined) continue;
    if (input[nextY][nextX] === "#") continue;

    const nextNode = new Node(
      nextY,
      nextX,
      newDy,
      newDx,
      sameDir ? steps + 1 : steps + 1001,
      endy - nextY + (endx - nextX),
      path.slice()
    );

    if (!visited.has(nextNode.toString())) {
      openSet.insert(nextNode);
    }
  }
}

function printGrid() {
  tiles.forEach((t) => {
    const [y, x] = t.split("_").map(Number);
    input[y][x] = "X";
  });
  input[starty][startx] = "S";
  input[endy][endx] = "E";

  const RESET = "\x1B[0m";
  const BG_RED = "\x1b[41m";
  const BG_BLUE = "\x1b[44m";

  for (let y = 0; y < input.length; y++) {
    let str = "";
    for (let x = 0; x < input[y].length; x++) {
      let c = input[y][x];
      if (c === "X") c = BG_BLUE + "X" + RESET;
      if (c === "S" || c === "E") c = BG_RED + c + RESET;
      str += c;
    }
    console.log(str);
  }
}

printGrid();

console.log(tiles.size);
