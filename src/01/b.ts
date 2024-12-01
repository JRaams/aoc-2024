import { defaultDict } from "../../helpers/defaultdict";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");

let leftList: number[] = [];
let rightCounts = defaultDict(Number);

input.forEach((line) => {
  const [l, r] = line.split("   ").map(Number);
  leftList.push(l);

  let rights = rightCounts[r];
  rightCounts[r] = rights + 1;
});

let total = 0;
leftList.forEach((l) => {
  total += l * rightCounts[l];
});

console.log(total);
