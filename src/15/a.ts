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

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "@") {
      robotX = x;
      robotY = y;
      break;
    }
  }
}

console.log(grid);
console.log(moves);
console.log(robotX, robotY);
printGrid();

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

moves.forEach((m) => {
  console.log("a", m);
  let dir: [number, number] = [0, 0];
  switch (m) {
    case "<": {
      dir = [-1, 0];
      break;
    }
    case "^": {
      dir = [0, -1];
      break;
    }
    case ">": {
      dir = [1, 0];
      break;
    }
    case "v": {
      dir = [0, 1];
      break;
    }
    default: {
      throw new Error("unknown move:" + m);
      break;
    }
  }

  console.log("b", m);

  const toMove: [number, number][] = [];
  let x = robotX;
  let y = robotY;
  while (grid[y][x] === "@" || grid[y][x] === "O") {
    console.log("c", m, y, x);
    toMove.push([x, y]);
    x += dir[0];
    y += dir[1];
  }

  console.log("d", m, grid[y][x], toMove);
  if (grid[y][x] === "#") return;

  switch (m) {
    case "<": {
      toMove.sort((a, b) => a[0] - b[0]);
      break;
    }
    case "^": {
      toMove.sort((a, b) => a[1] - b[1]);
      break;
    }
    case ">": {
      toMove.sort((a, b) => b[0] - a[0]);
      break;
    }
    case "v": {
      toMove.sort((a, b) => b[1] - a[1]);
      break;
    }
  }

  console.log("?");

  toMove.forEach(([itemX, itemY]) => {
    let oldx = itemX + dir[0];
    let oldy = itemY + dir[1];
    [grid[oldy][oldx], grid[itemY][itemX]] = [
      grid[itemY][itemX],
      grid[oldy][oldx],
    ];
  });

  robotX += dir[0];
  robotY += dir[1];

  printGrid();
});
