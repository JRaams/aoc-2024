import { defaultDict } from "../../helpers/defaultdict";
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

export class Tile {
  y: number;
  x: number;
  dy: number;
  dx: number;
  steps: number;
  path: Tile[];

  constructor(
    y: number,
    x: number,
    dy: number,
    dx: number,
    steps: number,
    path: Tile[]
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

const visited = defaultDict(() => Number.MAX_SAFE_INTEGER);
const openSet = new Heap<Tile>(
  (a, b) => a.steps - b.steps,
  [new Tile(STARTY, STARTX, 0, 1, 0, [])]
);

const bestTiles = new Set<string>();
let minSteps = Number.MAX_SAFE_INTEGER;

while (!openSet.isEmpty()) {
  const tile = openSet.pop()!;
  const { y, x, dy, dx, steps, path: oldPath } = tile;

  const key = tile.toString();
  if (steps > visited[key]) continue;
  visited[key] = steps;

  const path = oldPath.slice();
  path.push(tile);

  if (y === ENDY && x === ENDX) {
    if (steps > minSteps) break;
    minSteps = steps;

    bestTiles.add(`${y}_${x}`);
    tile.path.forEach((p) => {
      bestTiles.add(`${p.y}_${p.x}`);
    });

    continue;
  }

  if (grid[y + dy][x + dx] !== "#") {
    openSet.insert(new Tile(y + dy, x + dx, dy, dx, steps + 1, path));
  }
  openSet.insert(new Tile(y, x, dx, -dy, steps + 1000, path));
  openSet.insert(new Tile(y, x, -dx, dy, steps + 1000, path));
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
// printGrid();

console.log("a", minSteps);
console.log("b", bestTiles.size);
