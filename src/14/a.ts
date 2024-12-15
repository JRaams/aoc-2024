import { nums } from "../../helpers/input";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

type Robot = { px: number; py: number; vx: number; vy: number };

const robots = input.map<Robot>((line) => {
  const [px, py, vx, vy] = nums(line);
  return { px, py, vx, vy };
});

const GRID_HEIGHT = 103;
const GRID_WIDTH = 101;
const MIDDLE_X = Math.floor(GRID_WIDTH / 2);
const MIDDLE_Y = Math.floor(GRID_HEIGHT / 2);

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

const quadrants = [0, 0, 0, 0];

robots.forEach((r) => {
  const { px, py } = r;

  if (px < MIDDLE_X && py < MIDDLE_Y) {
    quadrants[0]++;
  } else if (px < MIDDLE_X && py > MIDDLE_Y) {
    quadrants[1]++;
  } else if (px > MIDDLE_X && py < MIDDLE_Y) {
    quadrants[2]++;
  } else if (px > MIDDLE_X && py > MIDDLE_Y) {
    quadrants[3]++;
  }
});

const safetyFactor = quadrants.reduce((a, b) => a * b, 1);
console.log(safetyFactor);
