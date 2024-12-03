const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines
  .trim()
  .split("\n")
  .join("")
  .replaceAll(/don\'t().*?do\(\)/gm, "");

const result = input
  .matchAll(/mul\((\d+),(\d+)\)/g)
  .map((x) => Number(x[1]) * Number(x[2]))
  .reduce((a, b) => a + b, 0);

console.log(result);
