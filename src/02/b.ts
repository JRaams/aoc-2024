import { isSafe } from "./reactor";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const reports = lines
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map(Number));

const safeReports = reports.filter((report) => {
  if (isSafe(report)) return true;

  for (let i = 0; i < report.length; i++) {
    const newArr = [
      ...report.slice(0, i),
      ...report.slice(i + 1, report.length),
    ];
    if (isSafe(newArr)) return true;
  }

  return false;
});

console.log(safeReports.length);
