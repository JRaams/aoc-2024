const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

type Robot = {
  px: number;
  py: number;
  vx: number;
  vy: number;
};

const robots = input.map<Robot>((line) => {
  const [_, px, py, vx, vy] = line
    .match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/)!
    .map(Number);

  return {
    px,
    py,
    vx,
    vy,
  };
});

const GRID_HEIGHT = 103;
const GRID_WIDTH = 101;
printGrid(GRID_WIDTH, GRID_HEIGHT, robots);

for (let i = 0; i < 100; i++) {
  robots.forEach((robot) => {
    robot.px += robot.vx;
    if (robot.px < 0) robot.px += GRID_WIDTH;
    if (robot.px >= GRID_WIDTH) robot.px -= GRID_WIDTH;

    robot.py += robot.vy;
    if (robot.py < 0) robot.py += GRID_HEIGHT;
    if (robot.py >= GRID_HEIGHT) robot.py -= GRID_HEIGHT;
  });
}

printGrid(GRID_WIDTH, GRID_HEIGHT, robots);

function robotDensity(robots: Robot[]): number[][] {
  let d: number[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    d.push([]);
    for (let x = 0; x < GRID_WIDTH; x++) {
      d[y].push(0);
    }
  }

  for (const r of robots) {
    d[r.py][r.px]++;
  }
  return d;
}

function printGrid(w: number, h: number, robots: Robot[]): void {
  console.log("=====");
  const densities = robotDensity(robots);

  for (let y = 0; y < h; y++) {
    let str = "";
    for (let x = 0; x < w; x++) {
      const d = densities[y][x];
      str += d === 0 ? "." : d;
    }
    console.log(str);
  }
}

const densities = robotDensity(robots);

let q1 = 0;
let q2 = 0;
let q3 = 0;
let q4 = 0;

let middleX = Math.floor(GRID_WIDTH / 2);
let middleY = Math.floor(GRID_HEIGHT / 2);

for (let y = 0; y < middleY; y++) {
  for (let x = 0; x < middleX; x++) {
    q1 += densities[y][x];
  }
}

for (let y = middleY + 1; y < densities.length; y++) {
  for (let x = 0; x < middleX; x++) {
    q2 += densities[y][x];
  }
}

for (let y = 0; y < middleY; y++) {
  for (let x = middleX + 1; x < densities[y].length; x++) {
    q3 += densities[y][x];
  }
}

for (let y = middleY + 1; y < densities.length; y++) {
  for (let x = middleX + 1; x < densities[y].length; x++) {
    q4 += densities[y][x];
  }
}

const safetyFactor = q1 * q2 * q3 * q4;
console.log(safetyFactor);
