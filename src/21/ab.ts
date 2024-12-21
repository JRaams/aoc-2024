import {
  buildDirectionalMap,
  buildNumericalMap,
  type KeypadMap,
} from "./keypad";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const doorCodes = lines.trim().split("\n");

const numericalMap = buildNumericalMap();

const directionalMap = buildDirectionalMap();

function getNumericSeqs(doorCode: string, map: KeypadMap): string[] {
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

function shortestSeqLength(
  start: string,
  end: string,
  depth: number,
  cache: Map<string, number>
): number {
  const key = start + "_" + end + "_" + depth;
  if (cache.has(key)) return cache.get(key)!;

  if (depth === 1) {
    return directionalMap[start][end][0].length;
  }

  let shortest = Number.MAX_SAFE_INTEGER;

  Object.values(directionalMap[start][end])
    .map((x) => "A" + x)
    .forEach((path) => {
      let length = 0;

      for (let i = 0; i < path.length - 1; i++) {
        length += shortestSeqLength(path[i], path[i + 1], depth - 1, cache);
      }

      shortest = Math.min(shortest, length);
    });

  cache.set(key, shortest);
  return shortest;
}

function shortestChainLength(
  seqs: string[],
  directionalRobots: number,
  cache: Map<string, number>
): number {
  let shortest = Number.MAX_SAFE_INTEGER;

  seqs
    .map((x) => "A" + x)
    .forEach((seq) => {
      let length = 0;

      for (let i = 0; i < seq.length - 1; i++) {
        length += shortestSeqLength(
          seq[i],
          seq[i + 1],
          directionalRobots,
          cache
        );
      }

      shortest = Math.min(shortest, length);
    });

  return shortest;
}

const cache = new Map<string, number>();
let a = 0;
let b = 0;

doorCodes.forEach((doorCode) => {
  const numericSeqs = getNumericSeqs(doorCode, numericalMap);
  const numeric = Number(doorCode.slice(0, -1));

  a += numeric * shortestChainLength(numericSeqs, 2, cache);
  b += numeric * shortestChainLength(numericSeqs, 25, cache);
});

console.log("a", a);
console.log("b", b);
