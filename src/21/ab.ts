import {
  buildDirectionalMap,
  buildNumericalMap,
  getNumericSeqs,
} from "./keypad";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const doorCodes = lines.trim().split("\n");

const numericalMap = buildNumericalMap();

const directionalMap = buildDirectionalMap();

const cache = new Map<string, number>();

function shortestSeqLength(start: string, end: string, depth: number): number {
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
        length += shortestSeqLength(path[i], path[i + 1], depth - 1);
      }

      shortest = Math.min(shortest, length);
    });

  cache.set(key, shortest);
  return shortest;
}

function shortestChainLength(
  seqs: string[],
  directionalRobots: number
): number {
  let shortest = Number.MAX_SAFE_INTEGER;

  seqs
    .map((x) => "A" + x)
    .forEach((seq) => {
      let length = 0;

      for (let i = 0; i < seq.length - 1; i++) {
        length += shortestSeqLength(seq[i], seq[i + 1], directionalRobots);
      }

      shortest = Math.min(shortest, length);
    });

  return shortest;
}

let a = 0;
let b = 0;

doorCodes.forEach((doorCode) => {
  const numericSeqs = getNumericSeqs(doorCode, numericalMap);
  const numeric = Number(doorCode.slice(0, -1));

  a += numeric * shortestChainLength(numericSeqs, 2);
  b += numeric * shortestChainLength(numericSeqs, 25);
});

console.log("a", a);
console.log("b", b);
