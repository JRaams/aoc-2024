import {
  buildDirectionalMap,
  buildNumericalMap,
  type KeypadMap,
} from "./keypad";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

const numericalMap = buildNumericalMap();
// console.log(numericalMap);

const directionalMap = buildDirectionalMap();
// console.log(directionalMap);

// <A ^A >^^A vvvA
// <A ^A ^>^A vvvA
// <A ^A ^^>A vvvA

function getInput(output: string, map: KeypadMap): string[] {
  const result: string[] = [];

  const queue: [string, string, string][] = [["A", output, ""]];

  while (queue.length) {
    const [current, str, path] = queue.shift()!;
    if (str.length === 0) {
      // console.log("?", path);
      result.push(path);
      continue;
    }
    const char = str[0];

    const options = map[current][char];
    // console.log(current, char, numericalMap[current][char], path);
    options.forEach((o) => {
      queue.push([char, str.slice(1), path + o + "A"]);
    });
  }

  return result;
}

let total = 0;

input.forEach((code) => {
  let shortest = Number.MAX_SAFE_INTEGER;

  getInput(code, numericalMap).forEach((layer1) => {
    getInput(layer1, directionalMap).forEach((layer2) => {
      getInput(layer2, directionalMap).forEach((layer3) => {
        shortest = Math.min(shortest, layer3.length);
      });
    });
  });

  const numeric = Number(code.slice(0, -1));
  total += shortest * numeric;
  console.log(code, shortest);
});

console.log(total);

// input.forEach((code) => {
//   const sequence = getDirectional(getDirectional(getNumerical(code)));
//   const numeric = Number(code.slice(0, -1));
//   console.log(code, sequence.length, numeric, sequence);
//   total += sequence.length * numeric;
// });

// const a = getInput("029A", numericalMap);

// console.log(a);

// a.forEach((x) => {
//   console.log(x, getInput(x, directionalMap));
// });

// function getNumericals(input: string): string[] {
//   let result: string[] = [];

//   let y = 3;
//   let x = 2;

//   let c = input[0];

//   return result;
// }

// <A ^A >^^A vvvA
// <A ^A ^>^A vvvA
// <A ^A ^^>A vvvA

// console.log(getNumericals("029A"));

// function getNumerical(input: string): string {
//   let result = "";

//   let current = "A";
//   input.split("").forEach((c) => {
//     result += numericalMap[current][c] + "A";
//     current = c;
//   });

//   return result;
// }

// const directionalMap: Record<string, Record<string, string>> = {
//   A: {
//     A: "",
//     "^": "<",
//     ">": "v",
//     v: "v<",
//     "<": "v<<",
//   },
//   "^": {
//     A: ">",
//     "^": "",
//     ">": ">v",
//     v: "v",
//     "<": "v<",
//   },
//   ">": {
//     A: "^",
//     "^": "^<",
//     ">": "",
//     v: "<",
//     "<": "<<",
//   },
//   v: {
//     A: "^>",
//     "^": "^",
//     ">": ">",
//     v: "",
//     "<": "<",
//   },
//   "<": {
//     A: ">>^",
//     "^": ">^",
//     ">": ">>",
//     v: ">",
//     "<": "",
//   },
// };

// function getDirectional(input: string): string {
//   let result = "";

//   let current = "A";
//   input.split("").forEach((c) => {
//     result += directionalMap[current][c] + "A";
//     current = c;
//   });

//   return result;
// }

// let total = 0;

// input.forEach((code) => {
//   const sequence = getDirectional(getDirectional(getNumerical(code)));
//   const numeric = Number(code.slice(0, -1));
//   console.log(code, sequence.length, numeric, sequence);
//   total += sequence.length * numeric;
// });

// console.log(total);
