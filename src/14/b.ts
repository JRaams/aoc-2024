import sharp from "sharp";

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

for (let i = 1; i < 10000; i++) {
  robots.forEach((robot) => {
    robot.px += robot.vx;
    if (robot.px < 0) robot.px += GRID_WIDTH;
    if (robot.px >= GRID_WIDTH) robot.px -= GRID_WIDTH;

    robot.py += robot.vy;
    if (robot.py < 0) robot.py += GRID_HEIGHT;
    if (robot.py >= GRID_HEIGHT) robot.py -= GRID_HEIGHT;
  });

  const grid = robotDensity(robots);
  const flat = grid.flat();
  const imageBuffer = Uint8Array.from(flat);

  await sharp(imageBuffer, {
    raw: {
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      channels: 1,
    },
  })
    .toFormat("png")
    .toFile(`./img/${i}.png`);
}

function robotDensity(robots: Robot[]): number[][] {
  let d: number[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    d.push([]);
    for (let x = 0; x < GRID_WIDTH; x++) {
      d[y].push(0);
    }
  }

  for (const r of robots) {
    d[r.py][r.px] = 255;
  }
  return d;
}
