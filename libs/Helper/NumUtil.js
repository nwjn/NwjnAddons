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

const [ GroupingsUS, GroupingsDE, CompactUS, CompactDE ] = function() {
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
}()

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
        for (let idx = 0; idx < string.length; idx++) {
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
        const idx = Math.min(((num - min) / (max - min) * 6) | 0, 5)
        return colors[idx < 0 ? 0 : idx][0]
    }

    static scaleHexCode(num, min, max) {
        const multi = Math.max(0, Math.min(1, (num - min) / (max - min)))
        
        const colorPos = multi * 5
        const lowerIdx = colorPos | 0
        const higherIdx = lowerIdx + 1
        
        return lowerIdx === 5 ? colors[5][1] : 
            this.lerpColor(colors[lowerIdx][1], colors[higherIdx][1], colorPos - lowerIdx)
    }

    /** Keeps full alpha */
    static lerpColor(start, end, multi) {
        if (start === end || multi === 0) return start

        return (
            (((start & 0xFF000000) + ((end & 0xFF000000) - (start & 0xFF000000)) * multi) & 0xFF000000) |
            (((start & 0x00FF0000) + ((end & 0x00FF0000) - (start & 0x00FF0000)) * multi) & 0x00FF0000) |
            (((start & 0x0000FF00) + ((end & 0x0000FF00) - (start & 0x0000FF00)) * multi) & 0x0000FF00) |
            0xff
        )
    }
}