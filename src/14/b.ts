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

outer: for (let i = 1; ; i++) {
  robots.forEach((robot) => {
    robot.px += robot.vx;
    if (robot.px < 0) robot.px += GRID_WIDTH;
    if (robot.px >= GRID_WIDTH) robot.px -= GRID_WIDTH;

    robot.py += robot.vy;
    if (robot.py < 0) robot.py += GRID_HEIGHT;
    if (robot.py >= GRID_HEIGHT) robot.py -= GRID_HEIGHT;
  });

  for (let a = 0; a < robots.length; a++) {
    for (let b = a + 1; b < robots.length; b++) {
      if (robots[a].px === robots[b].px && robots[a].py === robots[b].py) {
        continue outer;
      }
    }
  }

  console.log(i);

  await saveGridAsImage();

  break;
}

async function saveGridAsImage() {
  let grid: number[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    grid.push([]);
    for (let x = 0; x < GRID_WIDTH; x++) {
      grid[y].push(0);
    }
  }

  for (const r of robots) {
    grid[r.py][r.px] = 255;
  }

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
    .toFile(__dirname + "/tree.png");
}
