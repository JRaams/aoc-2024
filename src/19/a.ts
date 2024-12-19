const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [patternsRaw, designsRaw] = lines.trim().split("\n\n");

const patterns = patternsRaw.trim().split(", ");
patterns.sort((a, b) => a.length - b.length);
const designs = designsRaw.split("\n").map((x) => x.trim());

let possible = 0;

designs.forEach((d) => {
  const queue: string[] = [d];

  while (queue.length) {
    const design = queue.pop()!;

    if (design.length === 0) {
      possible++;
      return;
    }

    for (const p of patterns) {
      const index = design.indexOf(p);
      if (index !== 0) continue;

      const newDesign = design.replace(p, "");
      queue.push(newDesign);
    }
  }
});

console.log(possible);
