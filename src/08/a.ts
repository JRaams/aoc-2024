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

frequencies.values().forEach((antennas) => {
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      let [y1, x1] = antennas[i];
      let [y2, x2] = antennas[j];

      const dy = y2 - y1;
      const dx = x2 - x1;

      [y1, x1] = [y1 - dy, x1 - dx];
      if (grid[y1]?.[x1]) antinodes.add(`${y1}_${x1}`);

      [y2, x2] = [y2 + dy, x2 + dx];
      if (grid[y2]?.[x2]) antinodes.add(`${y2}_${x2}`);
    }
  }
});

console.log(antinodes.size);
