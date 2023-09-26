export const encode = (input) =>
  [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap((x) => x)
    .join(".")
    .match(/./g)
    .flatMap((x, i) => new Array(x == "." ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join("")
    .replace(/(([01])\2*)/g, (x) => `${+x ? "." : "-"}${x.length}`);

export const decode = (input) =>
  input
    .replace(/(\.|-)\d+/g, (x) => {
      return `${
        x[0] === "." ? "1".repeat(+x.slice(1)) : "0".repeat(+x.slice(1))
      }`;
    })
    .split("")
    .reduce((acc, item) => {
      if (!acc.length || !acc[acc.length - 1]?.includes(item)) {
        acc.push([item]);
      } else {
        acc[acc.length - 1].push(item);
      }

      return acc;
    }, [])
    .map((item) => (item.length === 1 ? "." : (item.length - 2) / 2))
    .join("")
    .split(".")
    .reduce((acc, item, index) => {
      if ((index + 1) % 2 === 0) {
        acc[acc.length - 1].push(+item);
      } else {
        acc.push([+item]);
      }

      return acc;
    }, [])
    .sort((a, b) => a[1] - b[1])
    .map((item) => String.fromCharCode(item[0]))
    .join("");
