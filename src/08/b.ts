const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const frequencies = new Map<string, [number, number][]>();

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    if (c === ".") continue;

    if (!frequencies.has(c)) {
      frequencies.set(c, []);
    }
    frequencies.get(c)!.push([y, x]);
  }
}

const antinodes = new Set<string>();

frequencies.values().forEach((coords) => {
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [ya1, xa1] = coords[i];
      const [ya2, xa2] = coords[j];

      antinodes.add(`${ya1}_${xa1}`);
      antinodes.add(`${ya2}_${xa2}`);

      const dy = ya2 - ya1;
      const dx = xa2 - xa1;

      let [yn1, xn1] = [ya1 - dy, xa1 - dx];
      while (grid[yn1]?.[xn1]) {
        antinodes.add(`${yn1}_${xn1}`);
        [yn1, xn1] = [yn1 - dy, xn1 - dx];
      }

      let [yn2, xn2] = [ya2 + dy, xa2 + dx];
      while (grid[yn2]?.[xn2]) {
        antinodes.add(`${yn2}_${xn2}`);
        [yn2, xn2] = [yn2 + dy, xn2 + dx];
      }
    }
  }
});

console.log(antinodes.size);
