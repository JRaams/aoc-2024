export function isSafe(report: number[]): boolean {
  let reportSign = 0;

  for (let i = 0; i < report.length - 1; i++) {
    let diff = Math.abs(report[i + 1] - report[i]);
    let sign = Math.sign(report[i + 1] - report[i]);

    if (reportSign !== 0 && reportSign !== sign) return false;
    reportSign = sign;

    if (diff < 1 || diff > 3) return false;
  }

  return true;
}
