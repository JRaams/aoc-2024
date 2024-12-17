import { nums } from "../../helpers/input";
import { run } from "./computer";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [_, programRaw] = lines.trim().split("\n\n");

const program = nums(programRaw).map(BigInt);

const queue: [bigint, bigint[]][] = [[0n, program]];

while (queue.length) {
  const [current, remaining] = queue.shift()!;

  if (remaining.length === 0) {
    console.log(Number(current / 8n));
    break;
  }

  for (let a = current; a < current + 8n; a++) {
    const output = run(a, 0n, 0n, program).out;
    if (output[0] !== remaining.at(-1)) continue;

    queue.push([a * 8n, remaining.slice(0, -1)]);
  }
}
