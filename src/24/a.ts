const __dirname = new URL(".", import.meta.url).pathname;
const text = await Bun.file(__dirname + "/input.txt").text();
const [inputsRaw, gatesRaw] = text.trim().split("\n\n");

const signals = new Map<string, number>();

inputsRaw.split("\n").forEach((line) => {
  const [gate, value] = line.trim().split(": ");
  signals.set(gate, Number(value));
});

type Gate = {
  in1: string;
  in2: string;
  op: "AND" | "OR" | "XOR";
};

const gates = new Map<string, Gate>();

gatesRaw.split("\n").forEach((line) => {
  const [_, in1, op, in2, out] = line.match(/(.+) (AND|XOR|OR) (.+) -> (.+)/)!;
  gates.set(out, { in1, in2, op: op as any });
});

function signal(gate: string): number {
  if (signals.has(gate)) return signals.get(gate)!;
  const { in1, in2, op } = gates.get(gate)!;

  let result: number;

  switch (op) {
    case "AND": {
      result = signal(in1) & signal(in2);
      break;
    }
    case "OR": {
      result = signal(in1) | signal(in2);
      break;
    }
    case "XOR": {
      result = signal(in1) ^ signal(in2);
      break;
    }
    default:
      throw new Error("unknown gate op: " + op);
  }

  signals.set(gate, result);
  return result;
}

const bits = Array.from(gates.keys())
  .filter((gate) => gate.startsWith("z"))
  .sort((a, b) => (a < b ? 1 : -1))
  .map((gate) => signal(gate));

const decimal = parseInt(bits.join(""), 2);

console.log(decimal);
