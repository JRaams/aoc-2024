const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let result = 0;

input.forEach((line) => {
  const [testRaw, numbersRaw] = line.split(": ");
  const test = Number(testRaw);
  const numbers = numbersRaw.split(" ").map(Number);

  function isValid(start: number, i: number): boolean {
    if (start > test) return false;

    if (i++ === numbers.length - 1) {
      return start === test;
    }

    return (
      isValid(start + numbers[i], i) ||
      isValid(start * numbers[i], i) ||
      isValid(Number(start + "" + numbers[i]), i)
    );
  }

  if (isValid(numbers[0], 0)) {
    result += test;
  }
});

console.log(result);
