const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("").map(Number);

// 1. Load blocks

let blocks = [];
let isFree = false;
let id = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    blocks.push(isFree ? "." : id);
  }
  if (isFree) {
    id++;
  }
  isFree = !isFree;
}

// 2. Move blocks

for (let i = 0; i < blocks.length; i++) {
  if (blocks[i] !== ".") continue;

  for (let j = blocks.length - 1; j > i; j--) {
    if (blocks[j] === ".") continue;
    blocks[i] = blocks[j];
    blocks[j] = ".";
    break;
  }
}

const disk = blocks.filter((x) => x !== ".") as number[];

// 3. Calculate checksum

let sum = 0;

for (let i = 0; i < disk.length; i++) {
  sum += i * disk[i];
}

console.log(sum);
