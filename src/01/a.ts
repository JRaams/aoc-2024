const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let leftList: number[] = [];
let rightList: number[] = [];

input.forEach((line) => {
  const [l, r] = line.split("   ").map(Number);
  leftList.push(l);
  rightList.push(r);
});

leftList.sort();
rightList.sort();

let total = 0;
leftList.forEach((l, i) => {
  total += Math.abs(l - rightList[i]);
});

console.log(total);
