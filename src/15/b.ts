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

printGrid();

moves.forEach((m) => {
  let dir: [number, number] = [-1, 0];
  if (m === "^") dir = [0, -1];
  else if (m === ">") dir = [1, 0];
  else if (m === "v") dir = [0, 1];

  const toMoveSet = new Set<string>();
  let canMove = true;

  // console.log("move", m, dir);

  const queue: [number, number][] = [[robotX, robotY]];
  while (queue.length) {
    const [x, y] = queue.pop()!;
    const key = `${x}_${y}`;
    if (toMoveSet.has(key)) continue;
    const c = grid[y][x];
    // console.log("q", x, y, c);

    if (c === "@") {
      toMoveSet.add(key);
      queue.push([x + dir[0], y + dir[1]]);
    } else if (c === "[") {
      toMoveSet.add(key);
      toMoveSet.add(`${x + 1}_${y}`);
      queue.push([x + dir[0], y + dir[1]]);
      queue.push([x + dir[0] + 1, y + dir[1]]);
    } else if (c === "]") {
      toMoveSet.add(key);
      toMoveSet.add(`${x - 1}_${y}`);
      queue.push([x + dir[0], y + dir[1]]);
      queue.push([x + dir[0] - 1, y + dir[1]]);
    } else if (c === "#") {
      canMove = false;
      break;
    }
  }

  if (!canMove) return;

  const toMove = Array.from(toMoveSet).map((x) => x.split("_").map(Number)) as [
    number,
    number
  ][];

  // console.log("toMove b4", toMove);
  if (m === "<") toMove.sort((a, b) => a[0] - b[0]);
  else if (m === "^") toMove.sort((a, b) => a[1] - b[1]);
  else if (m === ">") toMove.sort((a, b) => b[0] - a[0]);
  else if (m === "v") toMove.sort((a, b) => b[1] - a[1]);
  // console.log("toMove af", toMove);

  toMove.forEach(([newx, newy]) => {
    let oldx = newx + dir[0];
    let oldy = newy + dir[1];

    let temp = grid[oldy][oldx];
    grid[oldy][oldx] = grid[newy][newx];
    grid[newy][newx] = temp;
  });

  robotX += dir[0];
  robotY += dir[1];
  // printGrid();
});

function printGrid() {
  for (let y = 0; y < grid.length; y++) {
    let str = "";
    for (let x = 0; x < grid[y].length; x++) {
      str += grid[y][x];
    }
    console.log(str);
  }
  console.log();
}

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] !== "[") continue;
    result += y * 100 + x;
  }
}

console.log(result);
