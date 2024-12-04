const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

let xmases = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const char = input[y][x];
    if (char !== "X") continue;

    for (const dir of DIRS) {
      if (
        input[y + dir[0] * 1]?.[x + dir[1] * 1] === "M" &&
        input[y + dir[0] * 2]?.[x + dir[1] * 2] === "A" &&
        input[y + dir[0] * 3]?.[x + dir[1] * 3] === "S"
      ) {
        xmases++;
      }
    }
  }
}

console.log(xmases);
