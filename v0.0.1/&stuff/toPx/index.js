export default function toPx(value) {
  const px = 'px'
  const result = Number.parseFloat(value)

  if (Number.isNaN(result)) {
    throw new TypeError(
      `Invalid input: "${value}" could not be parsed into a number.`,
    )
  }

  return `${result}${px}`
}
