export default function countriesCase(countrie) {
  return countrie
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.toLowerCase().substring(1, el.length))
    .join(" ");
}
