const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [patternsRaw, designsRaw] = lines.trim().split("\n\n");

const patterns = patternsRaw.trim().split(", ");
const designs = designsRaw.split("\n").map((x) => x.trim());

function waysToMake(
  design: string,
  patterns: string[],
  cache: Map<string, number>
): number {
  if (cache.has(design)) return cache.get(design)!;

  if (design.length === 0) return 1;

  let result = 0;

  for (const p of patterns) {
    const index = design.indexOf(p);
    if (index !== 0) continue;

    const newDesign = design.replace(p, "");
    result += waysToMake(newDesign, patterns, cache);
  }

  cache.set(design, result);
  return result;
}

const ways = designs
  .map((design) => waysToMake(design, patterns, new Map()))
  .reduce((a, b) => a + b, 0);

console.log(ways);
