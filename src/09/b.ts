const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("").map(Number);

// 1. Load blocks

type Block = {
  ID: number | null;
  start: number;
  // end: number;

  length: number;
};

function printBlocks(bs: Block[]): void {
  let str = "";
  bs.forEach((b) => {
    for (let i = 0; i < b.length; i++) {
      str += b.ID === null ? "." : b.ID;
    }
  });
  console.log(str);
}

let blocks: Block[] = [];
let isFree = false;
let id = 0;
let pos = 0;

for (let i = 0; i < input.length; i++) {
  // for (let j = 0; j < input[i]; j++) {
  blocks.push({
    ID: isFree ? null : id,
    start: pos,
    // end: pos + input[i],

    length: input[i],
  });
  // blocks.push(isFree ? "." : id.toString());
  // }
  if (isFree) {
    id++;
  }
  isFree = !isFree;
  pos += input[i];
}

// console.table(blocks);
printBlocks(blocks);

/**
00...111...2...333.44.5555.6666.777.888899
 */

// 00...111...2...333.44.5555.6666.777.888899
// 0099.111...2...333.44.5555.6666.777.8888..
// 0099.1117772...333.44.5555.6666.....8888..
// 0099.111777244.333....5555.6666.....8888..
// 00992111777.44.333....5555.6666.....8888..

for (let i = blocks.length - 1; i > 0; i--) {
  const block = blocks[i];
  if (block.ID === null) continue;

  const space = blocks.findIndex(
    (x) => x.ID === null && x.length >= block.length && x.start < block.start
  );
  if (space === -1) continue;

  // console.log(block, space, blocks[space]);
  block.start = blocks[space].start;
  blocks[i - 1].length += block.length;

  blocks[space].start += block.length;
  blocks[space].length -= block.length;
  // console.log(block, space, blocks[space]);
  blocks.sort((a, b) => a.start - b.start);
  // printBlocks(blocks);
}

// // 2. Move blocks
// for (let i = blocks.length - 1; i >= 0; i--) {
//   // console.log(i, blocks[i]);
//   if (blocks[i] === ".") continue;

//   if (handled.has(blocks[i])) continue;

//   let originalIndex = i;
//   let originalChar = blocks[i];

//   handled.add(originalChar);

//   while (blocks[i] === originalChar) {
//     i--;
//   }
//   i++;

//   const diff = originalIndex - i + 1;
//   // console.log("originalChar", originalChar, originalIndex, diff);

//   // console.log(i, originalIndex, originalChar, diff);

//   let indexStr = "";
//   for (let k = 0; k < diff; k++) {
//     indexStr += ".";
//   }

//   const index = blocks.join("").indexOf(indexStr);
//   if (index !== -1 && index < i) {
//     // console.log("index", index, indexStr, originalIndex, originalChar);
//     for (let l = 0; l < diff; l++) {
//       // console.log("replacing", index + l, originalChar, originalIndex + l);
//       blocks[index + l] = originalChar;
//       blocks[originalIndex - l] = ".";
//     }
//   }
// }
// 3. Calculate checksum
// console.log(blocks.join(""));

let sum = 0;
for (let i = 0; i < blocks.length; i++) {
  const id = blocks[i].ID;
  if (id !== null) {
    for (let j = 0; j < blocks[i].length; j++) {
      sum += (blocks[i].start + j) * id;
    }
  }
}

console.log(sum);
