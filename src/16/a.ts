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

while (!openSet.isEmpty()) {
  const node = openSet.pop()!;
  const { y, x, dy, dx, steps } = node;

  if (y === endy && x === endx) {
    console.info("Found the end", steps, y, x);
    break;
  }

  const key = node.toString();
  if (!visited.has(key)) {
    visited.set(key, Number.MAX_SAFE_INTEGER);
  }

  const maxSteps = visited.get(key)!;
  if (steps >= maxSteps) continue;
  visited.set(key, steps);

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
      []
    );

    openSet.insert(nextNode);
  }
}
