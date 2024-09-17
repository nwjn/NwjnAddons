/**
 * Adds thousand seperators to numbers
 * @param {String|Number} num 
 * @param {String} seperator Character used as seperator (e.g. 10,000; 10.000; 10 000)
 * @returns {String} Fixed string num with thousand seperators
 */
export function comma(num, seperator = ",") {
  num = num?.toFixed(0) ?? num
  return num
    .replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
}

/**
   * Clamps a value between a min and max limit
   * @param {Number} value
   * @param {Number} min 
   * @param {Number} max 
   * @returns {Number}
   */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export function getDistance([x1, y1, z1], [x2, y2, z2]) {
  return Math.abs(Math.hypot(x1 - x2, y1 - y2, z1 - z2))
}

/**
 * * The value of 1° as radians
 * * Used for conversions
 */
export const radian = (Math.PI / 180)