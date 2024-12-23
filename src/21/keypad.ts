import { defaultDict } from "../../helpers/defaultdict";

export type KeypadMap = Record<string, Record<string, string[]>>;

function buildKeypadMap(keys: (string | undefined)[][]): KeypadMap {
  const map: KeypadMap = {};

  for (let y = 0; y < keys.length; y++) {
    for (let x = 0; x < keys[y].length; x++) {
      const c = keys[y][x];
      if (c === undefined) continue;
      map[c] = {};

      const queue: [number, number, number, string][] = [[y, x, 0, ""]];
      const seen = defaultDict(() => Number.MAX_SAFE_INTEGER);

      while (queue.length) {
        const [ny, nx, cost, path] = queue.shift()!;
        if (keys[ny]?.[nx] === undefined) continue;

        const lowestCost = seen[`${ny}_${nx}`];
        if (cost > lowestCost) continue;
        seen[`${ny}_${nx}`] = cost;

        const nc = keys[ny][nx];
        if (map[c][nc] === undefined) map[c][nc] = [];
        map[c][nc].push(path + "A");

        queue.push([ny + 1, nx, cost + 1, path + "v"]);
        queue.push([ny - 1, nx, cost + 1, path + "^"]);
        queue.push([ny, nx + 1, cost + 1, path + ">"]);
        queue.push([ny, nx - 1, cost + 1, path + "<"]);
      }
    }
  }

  return map;
}

export function buildNumericalMap() {
  return buildKeypadMap([
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [undefined, "0", "A"],
  ]);
}

export function buildDirectionalMap() {
  return buildKeypadMap([
    [undefined, "^", "A"],
    ["<", "v", ">"],
  ]);
}
