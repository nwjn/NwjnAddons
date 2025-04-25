const { US, GERMANY } = java.util.Locale
const NumberFormat = java.text.NumberFormat

const GroupingsUS = NumberFormat.getNumberInstance(US)
const GroupingsDE = NumberFormat.getNumberInstance(GERMANY)
GroupingsUS.setGroupingUsed(true)
GroupingsDE.setGroupingUsed(true)

const CompactUS = NumberFormat.getNumberInstance(US)
const CompactDE = NumberFormat.getNumberInstance(GERMANY)
CompactUS.setGroupingUsed(true)
CompactUS.setMaximumFractionDigits(3)
CompactDE.setGroupingUsed(true)
CompactDE.setMaximumFractionDigits(3)

const suffixes = "kmbtq"

export default class NumUtil {
    static RADIAN = Math.PI / 180

    static getDistance(arr1, arr2) {
        return Math.abs(Math.hypot(arr1[0] - arr2[0], arr1[1] - arr2[1], arr1[2] - arr2[2]))
    }

    static formatGrouped(number, locale = 0) {
        return !locale ? GroupingsUS.format(number) : GroupingsDE.format(number)
    }

    static parseGrouped(string, locale = 0) {
        return !locale ? GroupingsUS.parse(string) : GroupingsDE.parse(string)
    }

    static formatCompact(number, locale = 0) {
        if (number < 1E3) return !locale ? CompactUS.format(number) : CompactDE.format(number)

        let index = 0
        while (number >= 1000 && index < suffixes.length - 1) {
            number /= 1000
            index++
        }

        const formatted = !locale ? CompactUS.format(number) : CompactDE.format(number)
        const suffix = suffixes[index] ?? ""
        return `${formatted}${suffix}`
    }

    static parseCompact(string) {
        const match = string?.toLowerCase()?.match(/^([\d\.,]+)([kmbtq])?$/)
        if (!match) return parseInt(string)

        const number = parseFloat(match[1] ?? 0)
        const magnitude = suffixes.indexOf(match[2]) + 1

        return number * magnitude
    }

    static toRGBAHex(array) {
        return array[0] * 0x1000000
             + array[1] * 0x10000
             + array[2] * 0x100
             + array[3] * 0x1
    }

    static scaleAlphaOffset(hex, scaleFactor) {
        return hex - (hex & 0xff) * (1 - scaleFactor)
    }

    static rgbaToARGB(hex) {
        return (hex >> 24 & 0xff) * 0x10000
             + (hex >> 16 & 0xff) * 0x100
             + (hex >>  8 & 0xff) * 0x1
             + (hex >>  0 & 0xff) * 0x1000000
    }
}