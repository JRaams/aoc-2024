import { nums } from "../../helpers/input";
import { run } from "./computer";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [registerRaw, programRaw] = lines.trim().split("\n\n");

let [A, B, C] = nums(registerRaw).map(BigInt);
const program = nums(programRaw).map(BigInt);

const { out } = run(A, B, C, program);

console.log(out.join(","));
