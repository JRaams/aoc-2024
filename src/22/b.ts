const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n").map(Number);

const changeLists: number[][] = [];
const onesLists: number[][] = [];

input.forEach((s) => {
  let secret = BigInt(s);
  const currentChanges: number[] = [];
  const currentValues: number[] = [];
  let last = Number(s.toString().at(-1));

  for (let i = 0; i < 2000; i++) {
    let a = secret * 64n;
    secret = secret ^ a;
    secret = secret % 16777216n;

    let b = secret / 32n;
    secret = secret ^ b;
    secret = secret % 16777216n;

    let c = secret * 2048n;
    secret = secret ^ c;
    secret = secret % 16777216n;

    const ones = Number(secret.toString().at(-1));
    currentChanges.push(ones - last);
    currentValues.push(ones);
    last = ones;
  }

  changeLists.push(currentChanges);
  onesLists.push(currentValues);
});

const seqs = new Set<string>();

changeLists.forEach((c) => {
  for (let i = 4; i < c.length; i++) {
    let c1 = c[i - 3];
    let c2 = c[i - 2];
    let c3 = c[i - 1];
    let c4 = c[i];
    seqs.add(`${c1},${c2},${c3},${c4}`);
  }
});

let bananas = 0;

seqs.values().forEach((seq) => {
  const [a, b, c, d] = seq.split(",").map(Number);

  let current = 0;

  changeLists.forEach((changeList, changeIndex) => {
    for (let i = 4; i < changeList.length; i++) {
      if (
        changeList[i - 3] === a &&
        changeList[i - 2] === b &&
        changeList[i - 1] === c &&
        changeList[i] === d
      ) {
        current += onesLists[changeIndex][i];
        break;
      }
    }
  });

  bananas = Math.max(bananas, current);
});

console.log(bananas);
