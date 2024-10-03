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
    static NWJN = "§0§l[§c§lNwjn§0§l]§r"
    static NWJNADDONS = "§0§l[§c§lNwjnAddons§0§l]§r"
    static VERSION = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).version
    
    /**
     * - Matches the given regex with the given string
     * @param {RegExp} regex 
     * @param {String} string 
     * @returns {RegExpMatchArray | null}
     */
    static getRegexMatch(regex, string) {
        return regex.test(string) ? string.match(regex) : null
    }

   /**
    * - Check if the criteria is a regex or a string
    * - Regex is way more intensive so only use that if needed
    * @param {Function} fn Callback function
    * @param {String | RegExp} criteria The criteria to match with
    * @param {String} unformatted The current unformatted text
    * @param {Event} event The current packet event
    * @param {String} formatted The current formatted text
    * @returns returns the callback fn with the given matches or the current msg if the criteria is null
    */
   static matchesCriteria(fn, criteria, unformatted, event, formatted) {
        if (!criteria) return fn(unformatted, event, formatted)

        else if (typeof criteria === "string") {
            if (unformatted !== criteria) return

            return fn(unformatted, event, formatted)
        }

        else if (criteria instanceof RegExp) {
            const match = unformatted.match(criteria)
            if (!match) return

            return fn(...match.slice(1), event, formatted)
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
}