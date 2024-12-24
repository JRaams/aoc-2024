import type { Edge, Node } from "@vue-flow/core";
import { text } from "./input";

const [_, gatesRaw] = text.trim().split("\n\n");

type Operation = "AND" | "OR" | "XOR";

type Gate = {
  in1: string;
  in2: string;
  op: Operation;
  out: string;
};

const gates: Gate[] = [];

gatesRaw.split("\n").forEach((line) => {
  const [_, in1, op, in2, out] = line.match(/(.+) (AND|XOR|OR) (.+) -> (.+)/)!;

  gates.push({ in1, in2, out, op: op as any });
});

const sorters: Record<Operation, number> = {
  AND: 2,
  OR: 1,
  XOR: 0,
};

const opToColor: Record<Operation, string> = {
  AND: "orange",
  OR: "purple",
  XOR: "brown",
};

gates.sort((a, b) => {
  if (a.op !== b.op) return sorters[a.op] - sorters[b.op];
  return a.out > b.out ? 1 : -1;
});

export const nodeList: Node[] = [];
export const wires: Edge[] = [];

gates.forEach(({ in1, in2, op, out }) => {
  const node1 = {
    id: in1,
    data: { label: in1 },
    position: { x: 0, y: 0 },
  };

  const node2 = {
    id: in2,
    data: { label: in2 },
    position: { x: 0, y: 0 },
  };

  const nodeout = {
    id: out,
    data: { label: out },
    position: { x: 0, y: 0 },
    style: { backgroundColor: "#92fd92" } as any,
  };

  if (out.startsWith("z")) {
    nodeout.style.backgroundColor = "#377737";
    if (op !== "XOR") {
      nodeout.style.backgroundColor = "purple";
      nodeout.style.color = "white";
    }
  }

  if (
    op === "XOR" &&
    [in1[0], in2[0], out[0]].every((c) => c !== "x" && c !== "y" && c !== "z")
  ) {
    nodeout.style.backgroundColor = "red";
    nodeout.style.color = "white";
  }

  if (op === "AND") {
    const g = gates.find(
      (x) => x.op !== "OR" && (x.in1 === out || x.in2 === out)
    );
    if (g) {
      nodeout.style.backgroundColor = "blue";
      nodeout.style.color = "white";
    }
  }

  if (op === "XOR") {
    const g = gates.find(
      (x) => x.op === "OR" && (x.in1 === out || x.in2 === out)
    );
    if (g) {
      nodeout.style.backgroundColor = "brown";
      nodeout.style.color = "white";
    }
  }

  nodeList.push(node1, node2, nodeout);

  wires.push({
    id: in1 + out,
    source: in1,
    target: out,
    label: op,
    labelBgStyle: { fill: opToColor[op] },
  });
  wires.push({
    id: in2 + out,
    source: in2,
    target: out,
    label: op,
    labelBgStyle: { fill: opToColor[op] },
  });
});
