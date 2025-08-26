import ConfigProperty from "../../data/ConfigProperty"

const GroupingFormat = new ConfigProperty("DropDown", {
    category: "Home",
    subcategory: "Preferences",
    configName: "groupingFormat",
    title: "§e✯§r Number Format",
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

const colors = [
    ["§4", 0xAA0000FF],
    ["§c", 0xFF5555FF],
    ["§6", 0xFFAA00FF],
    ["§e", 0xFFFF55FF],
    ["§a", 0x55FF55FF],
    ["§2", 0x00AA00FF]
]

export default class NumUtil {
    static FORMAT = { US: 0, DE: 1 }

    static isFormatUS() {
        return GroupingFormat.value === 0
    }

    static swapFormat(string) {
        for (let idx in string) {
            let char = string[idx]

            if (char === ".") string[idx] = ","
            else if (char === ",") string[idx] = "."
        }
    }

    static RADIAN = Math.PI / 180

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

    static scaleColorCode(num, min, max) {
        const percent = ~~((num - min) / (max - min)) * 100
        const low = ~~(percent / 17)

        if (low >= colors.length) return colors[colors.length - 1][0]

        return colors[low][0]
    }

    static scaleHexCode(num, min, max) {
        const percent = ~~((num - min) / (max - min)) * 100
        const low = ~~(percent / 17)
        const high = low + 1

        if (high >= colors.length) return colors[colors.length - 1][1]

        const factor = percent / 17 - low
        return this.lerpColor(colors[low][1], colors[high][1], factor)
    }

    static lerpColor(color1, color2, multi) {
        const r1 = (color1 >> 24) & 0xff
        const g1 = (color1 >> 16) & 0xff
        const b1 = (color1 >> 8) & 0xff

        const r2 = (color2 >> 24) & 0xff
        const g2 = (color2 >> 16) & 0xff
        const b2 = (color2 >> 8) & 0xff

        const r = (r1 + (r2 - r1) * multi) << 24
        const g = (g1 + (g2 - g1) * multi) << 16
        const b = (b1 + (b2 - b1) * multi) << 8
        const a = 0xff

        return r + g + b + a
    }
}