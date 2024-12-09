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
  let isFree = false;
  let id = 0;
  let pos = 0;

  for (let i = 0; i < input.length; i++) {
    blocks.push({
      id: isFree ? null : id,
      start: pos,
      length: input[i],
    });

    if (isFree) {
      id++;
    }

    isFree = !isFree;
    pos += input[i];
  }

  return blocks;
}

function fragmentate(blocks: Block[]): void {
  for (let i = blocks.length - 1; i > 0; i--) {
    const block = blocks[i];
    if (block.id === null) continue;

    const space = blocks.find(
      (x) => x.id === null && x.length >= block.length && x.start < block.start
    );
    if (!space) continue;

    blocks[i - 1].length += block.length;
    block.start = space.start;

    space.start += block.length;
    space.length -= block.length;
  }
}

function calculateCheckSum(blocks: Block[]): number {
  let sum = 0;

  for (let i = 0; i < blocks.length; i++) {
    const id = blocks[i].id;
    if (id === null) continue;

    for (let j = 0; j < blocks[i].length; j++) {
      sum += (blocks[i].start + j) * id;
    }
  }

  return sum;
}

const blocks = loadBlocks(input);

fragmentate(blocks);

const checkSum = calculateCheckSum(blocks);

console.log(checkSum);
