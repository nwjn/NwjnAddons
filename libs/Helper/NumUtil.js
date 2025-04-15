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
}