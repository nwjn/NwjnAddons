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
     * - Gets the time since old date from current date
     * @param {Date} oldDate 
     * @returns {String} hrs:mins:secs
     */
    static getTime(oldDate) {
        const seconds = Math.round((Date.now() - oldDate) / 1000 % 60)
        const mins = Math.floor((Date.now() - oldDate) / 1000 / 60 % 60)
        const hours = Math.floor((Date.now() - oldDate) / 1000 / 60 / 60 % 24)

        return `${hours}:${mins}:${seconds}`
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
     * @param {Number} number 
     * @param {String} seperator 
     * @returns {String}
     */
    static addCommas = (number, seperator = ',') => ~~number.replace(/\B(?=(\d{3})+(?!\d))/g, seperator) ?? ~~number

    /**
     * @param {Number} number 
     * @returns {String}
     */
    static timeFormat = (number) => number.toString().length !== 2 ? `0${number}` : number.toString()
}