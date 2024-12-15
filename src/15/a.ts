const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [gridRaw, movesRaw] = lines.trim().split("\n\n");

const grid = gridRaw
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const moves = movesRaw
  .trim()
  .split("")
  .filter((x) => x !== "\n");

let robotX = 0;
let robotY = 0;

robot: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "@") {
      robotX = x;
      robotY = y;
      break robot;
    }
  }
}

moves.forEach((m) => {
  let dir: [number, number] = [-1, 0];
  if (m === "^") dir = [0, -1];
  else if (m === ">") dir = [1, 0];
  else if (m === "v") dir = [0, 1];

  const toMove: [number, number][] = [];
  let canMove = true;

  const queue: [number, number][] = [[robotX, robotY]];
  while (queue.length) {
    const [x, y] = queue.pop()!;
    const c = grid[y][x];

    if (c === "@") {
      toMove.push([x, y]);
      queue.push([x + dir[0], y + dir[1]]);
    } else if (c === "O") {
      toMove.push([x, y]);
      queue.push([x + dir[0], y + dir[1]]);
    } else if (c === "#") {
      canMove = false;
      break;
    }
  }

  if (!canMove) return;

  if (m === "<") toMove.sort((a, b) => a[0] - b[0]);
  else if (m === "^") toMove.sort((a, b) => a[1] - b[1]);
  else if (m === ">") toMove.sort((a, b) => b[0] - a[0]);
  else if (m === "v") toMove.sort((a, b) => b[1] - a[1]);

  toMove.forEach(([newx, newy]) => {
    let oldx = newx + dir[0];
    let oldy = newy + dir[1];

    let temp = grid[oldy][oldx];
    grid[oldy][oldx] = grid[newy][newx];
    grid[newy][newx] = temp;
  });

  robotX += dir[0];
  robotY += dir[1];
});

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] !== "O") continue;
    result += y * 100 + x;
  }
}

console.log(result);
