const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n").map(BigInt);

let total = 0;

input.forEach((secret) => {
  for (let i = 0; i < 2000; i++) {
    secret ^= (secret * 64n) % 16777216n;
    secret ^= (secret / 32n) % 16777216n;
    secret ^= (secret * 2048n) % 16777216n;
  }

  total += Number(secret);
});

console.log(total);
