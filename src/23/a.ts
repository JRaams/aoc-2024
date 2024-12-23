const __dirname = new URL(".", import.meta.url).pathname;
const text = await Bun.file(__dirname + "/input.txt").text();
const lines = text.trim().split("\n");

const connections = new Map<string, Set<string>>();

lines.forEach((line) => {
  const [a, b] = line.split("-");

  if (!connections.has(a)) connections.set(a, new Set());
  if (!connections.has(b)) connections.set(b, new Set());

  connections.get(a)?.add(b);
  connections.get(b)?.add(a);
});

const threes = new Set<string>();

connections.entries().forEach(([name1, cons]) => {
  if (!name1.startsWith("t")) return;

  cons.values().forEach((name2) => {
    connections.get(name2)?.forEach((name3) => {
      if (connections.get(name3)?.has(name1)) {
        threes.add([name1, name2, name3].sort().join(","));
      }
    });
  });
});

console.log(threes.size);
