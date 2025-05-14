import ConfigProperty from "../../data/ConfigProperty"

const GroupingFormat = new ConfigProperty("DropDown", {
    category: "Home",
    configName: "groupingFormat",
    title: "Number Format",
    description: "Choose how you want to format numbers",
    options: [ "US: 123,456.789", "DE: 123.456,789" ],
    value: 0
})

const { US, GERMANY } = java.util.Locale
const NumberFormat = java.text.NumberFormat

const GroupingsUS = NumberFormat.getNumberInstance(US)
GroupingsUS.setGroupingUsed(true)
GroupingsUS.setMaximumFractionDigits(15)
const GroupingsDE = NumberFormat.getNumberInstance(GERMANY)
GroupingsDE.setGroupingUsed(true)
GroupingsDE.setMaximumFractionDigits(15)

const CompactUS = NumberFormat.getNumberInstance(US)
CompactUS.setGroupingUsed(true)
CompactUS.setMaximumFractionDigits(3)
const CompactDE = NumberFormat.getNumberInstance(GERMANY)
CompactDE.setGroupingUsed(true)
CompactDE.setMaximumFractionDigits(3)

const suffixes = "kmbtq"

export default class NumUtil {
    static FORMAT = { US: 0, DE: 1 }

    static isFormatUS() {
        return GroupingFormat.value === 0
    }

    static RADIAN = Math.PI / 180

    static getDistance(arr1, arr2) {
        return Math.abs(Math.hypot(arr1[0] - arr2[0], arr1[1] - arr2[1], arr1[2] - arr2[2]))
    }

    static formatGrouped(number, locale = GroupingFormat.value) {
        return !locale ? GroupingsUS.format(+number) : GroupingsDE.format(+number)
    }

    static parseGrouped(string, locale = GroupingFormat.value) {
        return !locale ? GroupingsUS.parse(string) : GroupingsDE.parse(string)
    }

    static formatCompact(number, locale = GroupingFormat.value) {
        number = Number(number)
        
        if (number < 1E3) return !locale ? CompactUS.format(number) : CompactDE.format(number)

        let index = 0
        while (number >= 1000 && index < suffixes.length - 1) {
            number /= 1000
            index++
        }

        const formatted = !locale ? CompactUS.format(number) : CompactDE.format(number)
        const suffix = suffixes[index] ?? ""
        return formatted + suffix
    }

    static parseCompact(string) {
        const match = string?.toLowerCase()?.match(/^([\d\.,]+)([kmbtq])?$/)
        if (!match) return parseInt(string)

        const number = parseFloat(match[1] ?? 0)
        const magnitude = suffixes.indexOf(match[2]) + 1

        return number * Math.pow(10, 3 * magnitude)
    }
}