const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let result = 0;

input.forEach((line) => {
  const [testRaw, numbersRaw] = line.split(": ");
  const test = Number(testRaw);
  const numbers = numbersRaw.split(" ").map(Number);

  if (possibilities(test, numbers.slice(1), numbers[0])) {
    result += test;
  }
});

console.log(result);

function possibilities(test: number, nums: number[], start: number): number {
  if (nums.length === 0) {
    return start === test ? 1 : 0;
  }

  const add = possibilities(test, nums.slice(1), start + nums[0]);

  const multiply = possibilities(test, nums.slice(1), start * nums[0]);

  return add + multiply;
}
