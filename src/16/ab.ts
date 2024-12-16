import { Heap } from "../../helpers/heap";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const STARTX = 1;
const STARTY = grid.length - 2;
const ENDX = grid[0].length - 2;
const ENDY = 1;
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export class Node {
  y: number;
  x: number;
  dy: number;
  dx: number;
  steps: number;
  path: Node[];

  constructor(
    y: number,
    x: number,
    dy: number,
    dx: number,
    steps: number,
    path: Node[]
  ) {
    this.y = y;
    this.x = x;
    this.dy = dy;
    this.dx = dx;
    this.steps = steps;
    this.path = path;
  }

  public toString() {
    return `${this.y}_${this.x}_${this.dy}_${this.dx}`;
  }
}

const visited = new Map<string, number>();
const openSet = new Heap<Node>(
  (a, b) => a.steps - b.steps,
  [new Node(STARTY, STARTX, 0, 1, 0, [])]
);

const bestTiles = new Set<string>();
let minSteps = Number.MAX_SAFE_INTEGER;

while (!openSet.isEmpty()) {
  const node = openSet.pop()!;
  const { y, x, dy, dx, steps, path: oldPath } = node;
  const path = oldPath.slice();
  path.push(node);

  const key = node.toString();
  if (!visited.has(key)) {
    visited.set(key, Number.MAX_SAFE_INTEGER);
  }

  if (steps > visited.get(key)!) continue;
  visited.set(key, steps);

  if (y === ENDY && x === ENDX) {
    if (steps > minSteps) continue;
    minSteps = steps;

    bestTiles.add(`${y}_${x}`);
    node.path.forEach((p) => {
      bestTiles.add(`${p.y}_${p.x}`);
    });

    continue;
  }

  for (const [newDy, newDx] of DIRECTIONS) {
    const sameDir = newDy === dy && newDx === dx;

    const nextY = y + newDy;
    const nextX = x + newDx;
    if (grid[nextY][nextX] === "#") continue;

    const nextNode = new Node(
      nextY,
      nextX,
      newDy,
      newDx,
      sameDir ? steps + 1 : steps + 1001,
      path.slice()
    );

    if (!visited.has(nextNode.toString())) {
      openSet.insert(nextNode);
    }
  }
}

function printGrid() {
  bestTiles.forEach((t) => {
    const [y, x] = t.split("_").map(Number);
    grid[y][x] = "X";
  });
  grid[STARTY][STARTX] = "S";
  grid[ENDY][ENDX] = "E";

  const RESET = "\x1B[0m";
  const BG_RED = "\x1b[41m";
  const BG_BLUE = "\x1b[44m";

  for (let y = 0; y < grid.length; y++) {
    let str = "";
    for (let x = 0; x < grid[y].length; x++) {
      let c = grid[y][x];
      if (c === "X") c = BG_BLUE + "X" + RESET;
      if (c === "S" || c === "E") c = BG_RED + c + RESET;
      str += c;
    }
    console.log(str);
  }
}
printGrid();

console.log("a", minSteps);
console.log("b", bestTiles.size);
