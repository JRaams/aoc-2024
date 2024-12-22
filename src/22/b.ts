const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n").map(BigInt);

const seqBananas = new Map<string, number>();

input.forEach((secret) => {
  const prices: bigint[] = [secret % 10n];
  const diffs: number[] = [];

  for (let i = 0; i < 2000; i++) {
    secret ^= (secret * 64n) % 16777216n;
    secret ^= (secret / 32n) % 16777216n;
    secret ^= (secret * 2048n) % 16777216n;

    const last = prices.at(-1)!;
    const next = secret % 10n;

    diffs.push(Number(next - last));
    prices.push(next);
  }

  const seen = new Set<string>();
  for (let i = 4; i < diffs.length; i++) {
    const seq = `${diffs[i - 3]},${diffs[i - 2]},${diffs[i - 1]},${diffs[i]}`;

    if (seen.has(seq)) continue;
    seen.add(seq);

    const bananas = seqBananas.get(seq) || 0;
    seqBananas.set(seq, bananas + Number(prices[i + 1]));
  }
});

console.log(Math.max(...seqBananas.values()));
