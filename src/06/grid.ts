export const DELTAS = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // bottom
  [0, -1], // left
];

export function loadGrid(input: string[]) {
  const grid: string[][] = [];

  let playerY = 0;
  let playerX = 0;

  for (let y = 0; y < input.length; y++) {
    grid.push([]);
    for (let x = 0; x < input[y].length; x++) {
      grid[y][x] = input[y][x];
      if (input[y][x] === "^") {
        playerY = y;
        playerX = x;
        grid[y][x] = ".";
      }
    }
  }

  return {
    grid,
    playerY,
    playerX,
  };
}
