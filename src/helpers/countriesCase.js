export default function countriesCase(countrie) {
  if (!countrie) return "";
  return countrie
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.toLowerCase().substring(1))
    .join(" ");
}
