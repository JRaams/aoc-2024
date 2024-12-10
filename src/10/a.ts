const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split("").map(Number));

let scores = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === 0) {
      scores += getScore(y, x, 0, new Set<number>());
    }
  }
}

console.log(scores);

function getScore(
  y: number,
  x: number,
  height: number,
  visited: Set<number>
): number {
  if (input[y]?.[x] !== height) return 0;

  if (height === 9) {
    const key = y * input.length + x;
    if (visited.has(key)) return 0;
    visited.add(key);
    return 1;
  }

  let score = 0;

  score += getScore(y - 1, x, height + 1, visited);
  score += getScore(y, x + 1, height + 1, visited);
  score += getScore(y + 1, x, height + 1, visited);
  score += getScore(y, x - 1, height + 1, visited);

  return score;
}
