const __dirname = new URL(".", import.meta.url).pathname;
const text = await Bun.file(__dirname + "/input.txt").text();
const [_, gatesRaw] = text.trim().split("\n\n");

type Operation = "AND" | "OR" | "XOR";

type Gate = {
  in1: string;
  in2: string;
  op: Operation;
};

const gates = new Map<string, Gate>();

gatesRaw.split("\n").forEach((line) => {
  const [_, in1, op, in2, out] = line.match(/(.+) (AND|XOR|OR) (.+) -> (.+)/)!;
  gates.set(out, { in1, in2, op: op as Operation });
});

const swapped = new Set<string>();

gates.entries().forEach(([gate, { in1, op }]) => {
  if (gate[0] === "z" && gate !== "z00") {
    if (op !== "XOR") {
      swapped.add(gate);
      return;
    }
  }

  const childOperators = new Set<Operation>(
    gates
      .values()
      .filter((v) => {
        return v.in1 === gate || v.in2 === gate;
      })
      .map((x) => x.op)
  );

  if (op === "XOR") {
    if (childOperators.has("XOR") && !["x", "y"].includes(in1[0])) {
      swapped.add(gate);
    }

    if (childOperators.has("OR")) {
      swapped.add(gate);
    }
    return;
  }

  if (
    op === "AND" &&
    childOperators.has("AND") &&
    in1 !== "x00" &&
    in1 !== "y00"
  ) {
    swapped.add(gate);
    return;
  }
});

console.log(Array.from(swapped).sort().slice(0, -1).join(","));
