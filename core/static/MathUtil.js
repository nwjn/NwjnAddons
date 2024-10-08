// Credit: https://github.com/DocilElm/Doc/blob/main/shared/TextHelper.js
const numberFormat = { undefined: 1, "k": 1_000, "m": 1_000_000, "b": 1_000_000_000 };
export default class MathUtil {
    static toRadian = (num) => num * (Math.PI / 180)

    /**
     * - Gets the seconds since starting date
     * @param {Date} startingDate 
     * @param {Date} endingDate 
     * @returns string that contains the time in a fixed decimal value of 2
     */
    static getSecondsSince(startingDate, endingDate) {
        if (!startingDate || !endingDate || (startingDate instanceof Array && !startingDate[1])) return "0s"

        if (startingDate instanceof Array) return `${((startingDate[0]-startingDate[1])/1000).toFixed(2)}s`

        return `${((startingDate-endingDate)/1000).toFixed(2)}s`
    }

    /**
     * @param {Number} number 
     * @returns {String}
     */
    static timeFormat = (number) => number < 10 ? `0${number}` : number

    /**
     * - Gets the current system time
     * @returns {String} hrs:mins:secs
     */
    static getTime() {
        const date = new Date()
        const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
        return `${(h%12) || 12}:${MathUtil.timeFormat(m)}:${MathUtil.timeFormat(s)} ${h<12?"AM":"PM"}`
    }

    /**
     * - Converts a string into it's value in number e.g 1.2k to 1200
     * @param {String} string 
     * @returns {Number}
     */
    static convertToNumber(string) {
        const [ _, number, format ] = string.toLowerCase().match(/([\d\.,]+)([kmb])?/)

        return parseFloat(number) * numberFormat[format]
    }

    /**
     * Adds seperator notation to bigger numbers
     * @param {Number} num 
     * @param {String} seperator 
     * @returns {String}
     */
    static addCommas = (num, seperator = ',') => num.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, seperator)
}