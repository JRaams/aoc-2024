const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const grid: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

type Plot = {
  c: string;
  y: number;
  x: number;
  areaId: number | null;
  perimiter: number;
};

const plots: Plot[] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    const plot: Plot = { c, y, x, areaId: null, perimiter: 0 };

    if (grid[y - 1]?.[x] !== c) plot.perimiter++;
    if (grid[y][x + 1] !== c) plot.perimiter++;
    if (grid[y + 1]?.[x] !== c) plot.perimiter++;
    if (grid[y][x - 1] !== c) plot.perimiter++;

    plots.push(plot);
  }
}

let areaId = 0;

plots.forEach((plot) => {
  if (plot.areaId !== null) return;

  const queue: (Plot | undefined)[] = [plot];
  areaId++;

  while (queue.length) {
    const p = queue.pop();
    if (!p || p.areaId !== null || p.c !== plot.c) continue;

    p.areaId = areaId;

    queue.push(
      plots.find((n) => n.y === p.y - 1 && n.x === p.x),
      plots.find((n) => n.y === p.y && n.x === p.x - 1),
      plots.find((n) => n.y === p.y + 1 && n.x === p.x),
      plots.find((n) => n.y === p.y && n.x === p.x + 1)
    );
  }
});

let total = 0;

for (let i = 1; i <= areaId; i++) {
  const p = plots.filter((x) => x.areaId === i);
  const area = p.length;
  const perimiter = p.map((x) => x.perimiter).reduce((a, b) => a + b, 0);
  total += area * perimiter;
}

console.log(total);
