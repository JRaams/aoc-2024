export function run(
  A: number,
  B: number,
  C: number,
  program: number[]
): { A: number; B: Number; C: Number; out: number[] } {
  const out: number[] = [];
  let pointer = 0;

  function getCombo(operand: number): number {
    switch (operand) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return A;
      case 5:
        return B;
      case 6:
        return C;
      case 7:
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
      case 0: {
        // adv
        A = (A / Math.pow(2, getCombo(literal))) | 0;
        break;
      }
      case 1: {
        //bxl
        B = B ^ literal;
        break;
      }
      case 2: {
        //bst
        B = getCombo(literal) % 8;
        break;
      }
      case 3: {
        // jnz
        if (A !== 0) {
          pointer = literal - 2;
        }
        break;
      }
      case 4: {
        //bxc
        B = B ^ C;
        break;
      }
      case 5: {
        //out
        out.push(getCombo(literal) % 8);
        break;
      }
      case 6: {
        // bdv
        B = (A / Math.pow(2, getCombo(literal))) | 0;
        break;
      }
      case 7: {
        // cdv
        C = (A / Math.pow(2, getCombo(literal))) | 0;
        break;
      }
      default:
        throw new Error("unknown instruction: " + instr);
    }

    pointer += 2;
  }

  return { A, B, C, out };
}
