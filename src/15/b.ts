const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [gridRaw, movesRaw] = lines.trim().split("\n\n");

const grid = gridRaw
  .trim()
  .split("\n")
  .map((x) =>
    x
      .trim()
      .replaceAll("#", "##")
      .replaceAll("O", "[]")
      .replaceAll(".", "..")
      .replaceAll("@", "@.")
      .split("")
  );

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

  const toMoveSet = new Set<string>();
  const queue: [number, number][] = [[robotX, robotY]];

  while (queue.length) {
    const [x, y] = queue.pop()!;
    const c = grid[y][x];

    if (toMoveSet.has(`${x}_${y}`)) continue;

    if (c === "@") {
      toMoveSet.add(`${x}_${y}`);
      queue.push([x + dx, y + dy]);
    } else if (c === "[") {
      toMoveSet.add(`${x}_${y}`);
      toMoveSet.add(`${x + 1}_${y}`);
      queue.push([x + dx, y + dy]);
      queue.push([x + dx + 1, y + dy]);
    } else if (c === "]") {
      toMoveSet.add(`${x}_${y}`);
      toMoveSet.add(`${x - 1}_${y}`);
      queue.push([x + dx, y + dy]);
      queue.push([x + dx - 1, y + dy]);
    } else if (c === "#") {
      return;
    }
  }

  const toMove = Array.from(toMoveSet).map((s) => {
    const [x, y] = s.split("_").map(Number);
    return [x, y];
  });

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
    if (grid[y][x] !== "[") continue;
    result += y * 100 + x;
  }
}

console.log(result);
