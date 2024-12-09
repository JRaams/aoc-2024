const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("").map(Number);

type Block = {
  id: number | null;
  start: number;
  length: number;
};

function loadBlocks(input: number[]): Block[] {
  let blocks: Block[] = [];
  let id = 0;
  let pos = 0;

  for (let i = 0; i < input.length; i++) {
    blocks.push({
      id: i % 2 === 0 ? id : null,
      start: pos,
      length: input[i],
    });

    if (i % 2 === 0) {
      id++;
    }

    pos += input[i];
  }

  return blocks;
}

function defragmentate(blocks: Block[]): void {
  for (let i = blocks.length - 1; i > 0; i--) {
    const block = blocks[i];
    if (block.id === null) continue;

    const space = blocks.find(
      (x) =>
        x.id === null && //
        x.length >= block.length &&
        x.start < block.start
    );
    if (!space) continue;

    block.start = space.start;

    space.start += block.length;
    space.length -= block.length;
  }
}

function calculateCheckSum(blocks: Block[]): number {
  let sum = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.id === null) continue;

    for (let j = 0; j < block.length; j++) {
      sum += (block.start + j) * block.id;
    }
  }

  return sum;
}

const blocks = loadBlocks(input);

defragmentate(blocks);

const checkSum = calculateCheckSum(blocks);

console.log(checkSum);
