export default function pixels(value) {
  const px = 'px';
  const result = parseFloat(value);
  if (isNaN(result)) {
    throw new TypeError('The input could not be parsed into a number.');
  }
  return `${result}${px}`;
}
