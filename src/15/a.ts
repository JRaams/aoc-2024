const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [gridRaw, movesRaw] = lines.trim().split("\n\n");

const grid = gridRaw
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

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

const moves = movesRaw
  .trim()
  .split("")
  .filter((x) => x !== "\n");

moves.forEach((m) => {
  let dx = 0;
  let dy = 0;
  if (m === "^") dy = -1;
  else if (m === ">") dx = 1;
  else if (m === "v") dy = 1;
  else if (m === "<") dx = -1;

  const toMove: [number, number][] = [];
  const queue: [number, number][] = [[robotX, robotY]];

  while (queue.length) {
    const [x, y] = queue.pop()!;
    const c = grid[y][x];

    if (c === "@") {
      toMove.push([x, y]);
      queue.push([x + dx, y + dy]);
    } else if (c === "O") {
      toMove.push([x, y]);
      queue.push([x + dx, y + dy]);
    } else if (c === "#") {
      return;
    }
  }

  if (m === "^") toMove.sort((a, b) => a[1] - b[1]);
  else if (m === ">") toMove.sort((a, b) => b[0] - a[0]);
  else if (m === "v") toMove.sort((a, b) => b[1] - a[1]);
  else if (m === "<") toMove.sort((a, b) => a[0] - b[0]);

  toMove.forEach(([x, y]) => {
    let temp = grid[y][x];
    grid[y][x] = grid[y + dy][x + dx];
    grid[y + dy][x + dx] = temp;
  });

  robotX += dx;
  robotY += dy;
});

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] !== "O") continue;
    result += y * 100 + x;
  }
}

console.log(result);
