const testje = (val, width, height) => {
  const num = parseFloat(val.slice(0, -2));

  if (val.includes("vw")) return width * (num / 100);
  if (val.includes("vh")) return height * (num / 100);
};

console.log(testje("1.5vh", 1600, 900));
console.log(testje("1vw", 1600, 900));
console.log(testje("20vw", 1600, 900));
console.log(testje("20vh", 1600, 900));
console.log(testje("100vw", 1600, 900));
console.log(testje("100vh", 1600, 900));
