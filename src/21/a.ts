import {
  buildDirectionalMap,
  buildNumericalMap,
  getNumericSeqs,
} from "./keypad";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

const numericalMap = buildNumericalMap();

const directionalMap = buildDirectionalMap();

let total = 0;

input.forEach((code) => {
  let shortest = Number.MAX_SAFE_INTEGER;

  getNumericSeqs(code, numericalMap).forEach((layer1) => {
    getNumericSeqs(layer1, directionalMap).forEach((layer2) => {
      getNumericSeqs(layer2, directionalMap).forEach((layer3) => {
        shortest = Math.min(shortest, layer3.length);
      });
    });
  });

  const numeric = Number(code.slice(0, -1));
  total += shortest * numeric;
  console.log(code, shortest);
});

console.log(total);
