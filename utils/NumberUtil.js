export default class NumberUtil {
  /**
   * Clamps a value between a min and max limit
   * @param {Number} value
   * @param {Number} min 
   * @param {Number} max 
   * @returns {Number}
   */
  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * Adds commas to a number
   * @param {Number} value 
   * @param {Number} decimals >= 0
   * @returns {String}
   */
  static comma(value, decimals = null) {
    if (decimals !== null) value = value.toFixed(decimals)
    value = value.toString()
    
    if (num.includes(".")) {
      num = num.split(".")
      return `${comma(num[0])}.${num[1]}`
    }
    return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}