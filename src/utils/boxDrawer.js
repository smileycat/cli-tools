const boxStyles = require('./boxStyles.json');

function useStyle(style = 'normal') {
  return boxStyles[style];
}

function usePadding(padding) {
  if (padding === undefined || padding.length === 0) return [0, 0];
  if (padding.split(' ').length === 1) {
    const n = parseInt(padding);
    return [n, n];
  }

  const [n1, n2] = padding.split(' ');
  return [parseInt(n1), parseInt(n2)];
}

function draw(text, options) {
  console.log(format(text, options));
}

/**
 * Draw a border for the text, and returns as a string
 * @param {string} text
 * @param {*} options
 */
function format(text, options = {}) {
  const [vPad, hPad] = usePadding(options.padding);
  const length = text.length + 2 * (hPad + 1);
  const { topLeft, topRight, bottomLeft, bottomRight, vertical, horizontal } = useStyle(
    options.style,
  );

  return (
    `${topLeft + horizontal.repeat(length) + topRight}` + // top row
    `\n${vertical + ' '.repeat(length) + vertical}`.repeat(vPad) + // empty vertical row (padding)
    `\n${vertical + ' '.repeat(hPad)} ${text} ${' '.repeat(hPad) + vertical}` + // middle row
    `\n${vertical + ' '.repeat(length) + vertical}`.repeat(vPad) + // empty vertical row (padding)
    `\n${bottomLeft + horizontal.repeat(length) + bottomRight}` // bottom row
  );
}

module.exports = { draw, format };
