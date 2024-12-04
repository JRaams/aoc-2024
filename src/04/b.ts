const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let xmases = 0;

for (let y = 1; y < input.length - 1; y++) {
  for (let x = 1; x < input[y].length - 1; x++) {
    const char = input[y][x];
    if (char !== "A") continue;

    /**
     * A.B
     * ...
     * C.D
     */

    const A = input[y - 1][x - 1];
    const B = input[y - 1][x + 1];
    const C = input[y + 1][x - 1];
    const D = input[y + 1][x + 1];

    if (
      (A === "M" && B === "M" && C === "S" && D === "S") ||
      (A === "M" && B === "S" && C === "M" && D === "S") ||
      (A === "S" && B === "S" && C === "M" && D === "M") ||
      (A === "S" && B === "M" && C === "S" && D === "M")
    ) {
      xmases++;
    }
  }
}

console.log(xmases);
