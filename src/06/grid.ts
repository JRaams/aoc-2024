export function findPlayer(grid: string[][]): [number, number] {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "^") {
        return [y, x];
      }
    }
  }

  throw new Error("unable to find player position");
}

export function findVisited(
  grid: string[][],
  playerY: number,
  playerX: number
): Set<string> {
  const visited = new Set<string>();
  let dy = -1;
  let dx = 0;

  while (true) {
    visited.add(`${playerY}_${playerX}`);

    const newTile = grid[playerY + dy]?.[playerX + dx];
    if (newTile === undefined) break;

    if (newTile === "#") {
      [dx, dy] = [-dy, dx];
    } else {
      playerY += dy;
      playerX += dx;
    }
  }

  return visited;
}

export function detectLoop(g: string[][], py: number, px: number): boolean {
  const visited = new Set<string>();
  let dy = -1;
  let dx = 0;

  while (true) {
    const key = `${py}_${px}_${dy}_${dx}`;
    if (visited.has(key)) return true;
    visited.add(key);

    const newTile = g[py + dy]?.[px + dx];
    if (newTile === undefined) return false;

    if (newTile === "#") {
      [dx, dy] = [-dy, dx];
    } else {
      py += dy;
      px += dx;
    }
  }
}
