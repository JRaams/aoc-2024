const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("").map(Number);

// 1. Load blocks

let blocks: string[] = [];
let isFree = false;
let id = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    blocks.push(isFree ? "." : id.toString());
  }
  if (isFree) {
    id++;
  }
  isFree = !isFree;
}

console.log(blocks);
console.log(blocks.toReversed());

const handled = new Set();

// 2. Move blocks
for (let i = blocks.length - 1; i >= 0; i--) {
  // console.log(i, blocks[i]);
  if (blocks[i] === ".") continue;

  if (handled.has(blocks[i])) continue;

  let originalIndex = i;
  let originalChar = blocks[i];

  handled.add(originalChar);

  while (blocks[i] === originalChar) {
    i--;
  }
  i++;

  const diff = originalIndex - i + 1;
  // console.log("originalChar", originalChar, originalIndex, diff);

  // console.log(i, originalIndex, originalChar, diff);

  let indexStr = "";
  for (let k = 0; k < diff; k++) {
    indexStr += ".";
  }

  const index = blocks.join("").indexOf(indexStr);
  if (index !== -1 && index < i) {
    // console.log("index", index, indexStr, originalIndex, originalChar);
    for (let l = 0; l < diff; l++) {
      // console.log("replacing", index + l, originalChar, originalIndex + l);
      blocks[index + l] = originalChar;
      blocks[originalIndex - l] = ".";
    }
  }
}
// 3. Calculate checksum

let sum = 0;
for (let i = 0; i < blocks.length; i++) {
  if (blocks[i] !== ".") {
    sum += i * Number(blocks[i]);
  }
}

console.log(sum);
