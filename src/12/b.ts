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
  corners: number;
};

const plots: Plot[][] = [];

for (let y = 0; y < grid.length; y++) {
  plots.push([]);
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    const plot: Plot = { c, y, x, areaId: null, perimiter: 0, corners: 0 };

    const top = grid[y - 1]?.[x];
    const right = grid[y][x + 1];
    const bottom = grid[y + 1]?.[x];
    const left = grid[y][x - 1];

    if (top !== c) plot.perimiter++;
    if (right !== c) plot.perimiter++;
    if (bottom !== c) plot.perimiter++;
    if (left !== c) plot.perimiter++;

    if (top !== c && left !== c) plot.corners++;
    if (top === c && left === c && grid[y - 1]?.[x - 1] !== c) plot.corners++;

    if (top !== c && right !== c) plot.corners++;
    if (top === c && right === c && grid[y - 1]?.[x + 1] !== c) plot.corners++;

    if (bottom !== c && right !== c) plot.corners++;
    if (bottom === c && right === c && grid[y + 1]?.[x + 1] !== c)
      plot.corners++;

    if (bottom !== c && left !== c) plot.corners++;
    if (bottom === c && left === c && grid[y + 1]?.[x - 1] !== c)
      plot.corners++;

    plots[y].push(plot);
  }
}

let areaId = 0;

plots.forEach((py) => {
  py.forEach((px) => {
    if (px.areaId !== null) return;

    const queue: (Plot | undefined)[] = [px];
    areaId++;

    while (queue.length) {
      const p = queue.pop();
      if (!p || p.areaId !== null || p.c !== px.c) continue;

      p.areaId = areaId;

      queue.push(
        plots[p.y - 1]?.[p.x],
        plots[p.y]?.[p.x + 1],
        plots[p.y + 1]?.[p.x],
        plots[p.y]?.[p.x - 1]
      );
    }
  });
});

let total = 0;

for (let i = 1; i <= areaId; i++) {
  const ps: Plot[] = [];
  plots.forEach((py) => {
    py.forEach((px) => {
      if (px.areaId === i) {
        ps.push(px);
      }
    });
  });

  const area = ps.length;
  const perimiter = ps.map<number>((x) => x.corners).reduce((a, b) => a + b, 0);
  total += area * perimiter;
}

console.log(total);
