import { defaultDict } from "../../helpers/defaultdict";

export type KeypadMap = Record<string, Record<string, string[]>>;

const numericals: (string | undefined)[][] = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [undefined, "0", "A"],
];

export function buildNumericalMap(): KeypadMap {
  const numericalMap: KeypadMap = {};

  for (let y = 0; y < numericals.length; y++) {
    for (let x = 0; x < numericals[y].length; x++) {
      const c = numericals[y][x];
      if (c === undefined) continue;
      numericalMap[c] = {};

      const queue: [number, number, number, string][] = [[y, x, 0, ""]];
      const seen = defaultDict(() => Number.MAX_SAFE_INTEGER);

      while (queue.length) {
        const [ny, nx, cost, path] = queue.shift()!;
        if (numericals[ny]?.[nx] === undefined) continue;

        const lowestCost = seen[`${ny}_${nx}`];
        if (cost > lowestCost) continue;
        seen[`${ny}_${nx}`] = cost;

        const nc = numericals[ny][nx];
        if (numericalMap[c][nc] === undefined) numericalMap[c][nc] = [];
        numericalMap[c][nc].push(path);

        queue.push([ny + 1, nx, cost + 1, path + "v"]);
        queue.push([ny - 1, nx, cost + 1, path + "^"]);
        queue.push([ny, nx + 1, cost + 1, path + ">"]);
        queue.push([ny, nx - 1, cost + 1, path + "<"]);
      }
    }
  }

  return numericalMap;
}

const directions: (string | undefined)[][] = [
  [undefined, "^", "A"],
  ["<", "v", ">"],
];

export function buildDirectionalMap(): KeypadMap {
  const directionalMap: KeypadMap = {};

  for (let y = 0; y < directions.length; y++) {
    for (let x = 0; x < directions[y].length; x++) {
      const c = directions[y][x];
      if (c === undefined) continue;
      directionalMap[c] = {};

      const queue: [number, number, number, string][] = [[y, x, 0, ""]];
      const seen = defaultDict(() => Number.MAX_SAFE_INTEGER);

      while (queue.length) {
        const [ny, nx, cost, path] = queue.shift()!;
        if (directions[ny]?.[nx] === undefined) continue;

        const lowestCost = seen[`${ny}_${nx}`];
        if (cost > lowestCost) continue;
        seen[`${ny}_${nx}`] = cost;

        const nc = directions[ny][nx];
        if (directionalMap[c][nc] === undefined) directionalMap[c][nc] = [];
        directionalMap[c][nc].push(path + "A");

        queue.push([ny + 1, nx, cost + 1, path + "v"]);
        queue.push([ny - 1, nx, cost + 1, path + "^"]);
        queue.push([ny, nx + 1, cost + 1, path + ">"]);
        queue.push([ny, nx - 1, cost + 1, path + "<"]);
      }
    }
  }

  return directionalMap;
}

export function getNumericSeqs(doorCode: string, map: KeypadMap): string[] {
  const result: string[] = [];

  const queue: [string, string, string][] = [["A", doorCode, ""]];

  while (queue.length) {
    const [current, str, path] = queue.shift()!;
    if (str.length === 0) {
      result.push(path);
      continue;
    }
    const char = str[0];

    const options = map[current][char];
    options.forEach((o) => {
      queue.push([char, str.slice(1), path + o + "A"]);
    });
  }

  return result;
}
