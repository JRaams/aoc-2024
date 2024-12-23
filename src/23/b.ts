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

let longest = 0;
let answer = "";

const queue: string[] = [...connections.keys()];
const seen = new Set<string>();

q: while (queue.length) {
  const password = queue.shift()!;

  if (seen.has(password)) continue;
  seen.add(password);

  const names = password.split(",");

  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const n1 = names[i];
      const n2 = names[j];
      if (!connections.get(n1)?.has(n2) || !connections.get(n2)?.has(n1)) {
        continue q;
      }
    }
  }

  if (names.length > longest) {
    longest = names.length;
    answer = password;
  }

  names.forEach((name) => {
    connections.get(name)?.forEach((name2) => {
      if (names.includes(name2)) return;

      const copy = names.slice();
      copy.push(name2);
      copy.sort();
      queue.push(copy.join(","));
    });
  });
}

console.log(answer);
