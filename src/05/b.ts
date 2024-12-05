const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [rawRules, rawPages] = lines.trim().split("\n\n");

const rules = new Map<number, number[]>();
rawRules.split("\n").forEach((line) => {
  const [x, y] = line.split("|").map(Number);
  if (!rules.get(x)) {
    rules.set(x, []);
  }
  rules.get(x)!.push(y);
});

const pages = rawPages.split("\n").map((x) => x.split(",").map(Number));

let middlePageSum = 0;

pages.forEach((page) => {
  let isCorrect = true;

  for (let i = 1; i < page.length; i++) {
    const a = page[i];

    for (let j = 0; j < i; j++) {
      const b = page[j];
      if (rules.get(a)?.includes(b)) {
        isCorrect = false;
        page[i] = b;
        page[j] = a;
        i = 1;
        j = 0;
      }
    }
  }

  if (!isCorrect) {
    middlePageSum += page[Math.floor(page.length / 2)];
  }
});

console.log(middlePageSum);
