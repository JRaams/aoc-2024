import { nums } from "../../helpers/input";
import { run } from "./computer";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [_, programRaw] = lines.trim().split("\n\n");

const program = nums(programRaw).map(BigInt);

function validInputs(): bigint[] {
  const results: bigint[] = [];

  function dfs(current: bigint, remainingGoal: bigint[]) {
    if (remainingGoal.length === 0) {
      results.push(current / 8n);
      return;
    }

    for (let a = current; a < current + 8n; a++) {
      const trialResult = run(a, 0n, 0n, program);
      if (trialResult.out[0] === remainingGoal[remainingGoal.length - 1]) {
        dfs(a * 8n, remainingGoal.slice(0, remainingGoal.length - 1));
      }
    }
  }

  dfs(0n, program);
  return results;
}

const result = Array.from(validInputs()).map(Number);
console.log(Math.min(...result));
