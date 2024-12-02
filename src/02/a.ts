import { isSafe } from "./reactor";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const reports = lines
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map(Number));

const safeReports = reports.filter(isSafe);

console.log(safeReports.length);
