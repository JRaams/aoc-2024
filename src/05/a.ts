const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [rawRules, rawPages] = lines.trim().split("\n\n");

const pages = rawPages.split("\n").map((x) => x.split(",").map(Number));
const rules = new Map<number, number[]>();

rawRules.split("\n").forEach((line) => {
  const [x, y] = line.split("|").map(Number);
  if (!rules.get(x)) {
    rules.set(x, []);
  }
  rules.get(x)!.push(y);
});

let middlePageSum = 0;

pages.forEach((page) => {
  for (let i = 1; i < page.length; i++) {
    const a = page[i];

    for (let j = 0; j < i; j++) {
      const b = page[j];
      if (rules.get(a)?.includes(b)) return;
    }
  }

  middlePageSum += page[Math.floor(page.length / 2)];
});

console.log(middlePageSum);
