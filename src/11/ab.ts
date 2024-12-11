const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split(" ").map(Number);

const cache = new Map<string, number>();

function count(stone: number, steps: number): number {
  const key = `${stone}_${steps}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  let result = 0;
  const str = stone.toString();

  if (steps === 0) {
    result = 1;
  } else if (stone === 0) {
    result = count(1, steps - 1);
  } else if (str.length % 2 === 0) {
    const a = Number(str.substring(0, str.length / 2));
    const b = Number(str.substring(str.length / 2));
    result = count(a, steps - 1) + count(b, steps - 1);
  } else {
    result = count(stone * 2024, steps - 1);
  }

  cache.set(key, result);
  return result;
}

let resulta = input.reduce((total, i) => total + count(i, 25), 0);
let resultb = input.reduce((total, i) => total + count(i, 75), 0);

console.log(resulta);
console.log(resultb);
