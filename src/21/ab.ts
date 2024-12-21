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

  const queue = [["A", doorCode, ""]];

  while (queue.length) {
    const [currentButton, remainingCode, path] = queue.shift()!;
    if (remainingCode.length === 0) {
      result.push(path);
      continue;
    }
    const newButton = remainingCode[0];

    const options = map[currentButton][newButton];
    options.forEach((option) => {
      queue.push([newButton, remainingCode.slice(1), path + option + "A"]);
    });
  }

  return result;
}

const cache = new Map<string, number>();

function shortestSeqLength(seq: string, depth: number) {
  const key = `${seq}_${depth}`;
  if (cache.has(key)) return cache.get(key)!;

  seq = "A" + seq;
  let length = 0;

  if (depth === 1) {
    for (let i = 0; i < seq.length - 1; i++) {
      length += directionalMap[seq[i]][seq[i + 1]][0].length;
    }
    return length;
  }

  for (let i = 0; i < seq.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;

    directionalMap[seq[i]][seq[i + 1]].forEach((x) => {
      const len = shortestSeqLength(x, depth - 1);
      min = Math.min(min, len);
    });

    length += min;
  }

  cache.set(key, length);
  return length;
}

let a = 0;
let b = 0;

doorCodes.forEach((doorCode) => {
  const numericSeqs = getNumericSeqs(doorCode, numericalMap);
  const numeric = Number(doorCode.slice(0, -1));

  a += numeric * Math.min(...numericSeqs.map((s) => shortestSeqLength(s, 2)));
  b += numeric * Math.min(...numericSeqs.map((s) => shortestSeqLength(s, 25)));
});

console.log("a", a);
console.log("b", b);
