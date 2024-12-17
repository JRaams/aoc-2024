export function run(
  A: bigint,
  B: bigint,
  C: bigint,
  program: bigint[]
): { A: bigint; B: bigint; C: bigint; out: bigint[] } {
  const out: bigint[] = [];
  let pointer = 0;

  function getCombo(operand: bigint): bigint {
    switch (operand) {
      case 0n:
      case 1n:
      case 2n:
      case 3n:
        return operand;
      case 4n:
        return A;
      case 5n:
        return B;
      case 6n:
        return C;
      case 7n:
        throw new Error("Combo operand 7 is reserved");
      default:
        throw new Error("Unknown combo operand: " + operand);
    }
  }

  while (true) {
    if (pointer >= program.length) {
      break;
    }

    const instr = program[pointer];
    const literal = program[pointer + 1];

    switch (instr) {
      case 0n: {
        // adv
        A = (A / 2n ** getCombo(literal)) | 0n;
        break;
      }
      case 1n: {
        //bxl
        B = B ^ literal;
        break;
      }
      case 2n: {
        //bst
        B = getCombo(literal) % 8n;
        break;
      }
      case 3n: {
        // jnz
        if (A !== 0n) {
          pointer = Number(literal) - 2;
        }
        break;
      }
      case 4n: {
        //bxc
        B = B ^ C;
        break;
      }
      case 5n: {
        //out
        out.push(getCombo(literal) % 8n);
        break;
      }
      case 6n: {
        // bdv
        B = (A / 2n ** getCombo(literal)) | 0n;
        break;
      }
      case 7n: {
        // cdv
        C = (A / 2n ** getCombo(literal)) | 0n;
        break;
      }
      default:
        throw new Error("unknown instruction: " + instr);
    }

    pointer += 2;
  }

  return { A, B, C, out };
}
