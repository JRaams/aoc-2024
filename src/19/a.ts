const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [patternsRaw, designsRaw] = lines.trim().split("\n\n");

const patterns = patternsRaw.trim().split(", ");
const designs = designsRaw.split("\n").map((x) => x.trim());

let possible = 0;

designs.forEach((d) => {
  let queue: string[] = [d];

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
      if (newDesign === design) continue;
      queue.push(newDesign);
    }
  }
});

console.log(possible);
