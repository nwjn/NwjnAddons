const dungeonFloorWords = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven"
}

const kuudraTierWords = {
    1: "basic",
    2: "hot",
    3: "burning",
    4: "fiery",
    5: "infernal"
}

export default class TextUtil {
    /**
     * - Returns the matches of the regex or an empty array
     * @param {RegExp} regex 
     * @param {String} string
     * @returns {RegExpMatchArray|[]} matches 
     */
    static getMatches(regex, string) {
        const match = string?.match(regex)

        if (match && match?.shift()) return match
        return []
    }
    
    /**
     * - Check if the criteria is a regex or a string
     * - Regex is way more intensive so only use that if needed
     * - Credit: https://github.com/DocilElm/Doc/blob/main/shared/TextHelper.js#L64
     * @param {Function} fn Callback function
     * @param {String | RegExp} criteria The criteria to match with
     * @param {String} unformatted The current unformatted text
     * @param {?Event} event The current packet event
     * @param {?String} formatted The current formatted text
     * @returns returns the callback fn with the given matches or the current msg if the criteria is null
     */
    static matchesCriteria(fn, criteria, unformatted, event, formatted = null, chatComponent = null) {
        if (!criteria) return fn(unformatted, event, formatted)

        else if (typeof criteria === "string") {
            if (unformatted !== criteria) return

            return fn(unformatted, event, formatted)
        }

        else if (criteria instanceof RegExp) {
            const match = unformatted.match(criteria)
            if (!match) return

            return fn(...match.slice(1), event, formatted, chatComponent)
        }
    }

    /**
     * The dungeon floor word for the specified number
     * @param {Number} number 
     * @returns {String}
     */
    static getFloorWord = (number) => dungeonFloorWords[number]

    /**
     * The kuudra tier word for the specified number
     * @param {Number} number 
     * @returns {String}
     */
    static getTierWord = (number) => kuudraTierWords[number]

    /**
     * @param {String[]} tab 
     * @param {RegExp} startRegex 
     * @param {RegExp} endRegex 
     * @returns {?String[]}
     */
    static getTabBlock(tab, startRegex, endRegex = /^\s\w+/) {
        const startIndex = tab.findIndex(it => startRegex.test(it))
        const endIndex = tab.findIndex((it, i) => ~startIndex && i > startIndex && !endRegex.test(it))

        return ~startIndex && ~endIndex ? tab.slice(startIndex + 1, endIndex) : null
    }

    /**
     * Strips rank and tags from player
     * @param {string} string
     * @returns {?string} Player ign
     */
    static getSenderName(string) {
        const [name] = TextUtil.getMatches(/(?:\[\w+\+*\] )?(?:\s?.?\s?)(\w{1,16})(?:\s?.?\s?):/, string.removeFormatting())
        return name
    }

    static stringify(object) {
        return JSON.stringify(object, null, 4)
    }
}