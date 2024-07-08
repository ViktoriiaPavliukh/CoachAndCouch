export default function countriesCase(countrie) {
  if (!countrie) return "";
  if (countrie.length === 3) {
    return countrie.toUpperCase();
  } else {
    return countrie
      .split(/(\s+|[-()])/)
      .map((el) => {
        if (
          el.toLowerCase() === "і" ||
          el.toLowerCase() === "та" ||
          el.toLowerCase() === "в"
        ) {
          return el.toLowerCase();
        } else if (el.toUpperCase() === "США") {
          return el.toUpperCase();
        }
        return el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
      })
      .join("");
  }
}
