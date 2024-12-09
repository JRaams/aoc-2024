const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("").map(Number);

// 1. Load blocks

let blocks: number[] = [];
let id = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    blocks.push(i % 2 === 0 ? id : -1);
  }

  if (i % 2 === 0) {
    id++;
  }
}

// 2. Move blocks

const len = blocks.length;
for (let i = 0; i < len; i++) {
  while (blocks.at(-1) === -1) blocks.pop();

  if (blocks[i] !== -1) continue;

  blocks[i] = blocks.pop()!;
}

// 3. Calculate checksum

let sum = blocks.reduce((sum, id, index) => sum + id * index, 0);

console.log(sum);
