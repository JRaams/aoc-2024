const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n").map(Number);

let total = 0;

input.forEach((s) => {
  let secret = BigInt(s);

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
  }

  total += Number(secret);
});

console.log(total);
