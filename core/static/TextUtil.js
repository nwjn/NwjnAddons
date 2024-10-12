// Based off https://github.com/DocilElm/Doc/blob/main/shared/TextHelper.js

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
    static VERSION = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).version

    // Credit: DocilElm {
    static NWJN = "§0§l[§c§lNwjn§0§l]§r"
    static NWJNADDONS = "§0§l[§c§lNwjnAddons§0§l]§r"
    // }
    
    /**
     * - Returns the matches of the regex
     * - For assignments
     * @param {RegExp} regex 
     * @param {String} string
     * @param {Number} vars the number of vars to be assigned 
     * @returns {RegExpMatchArray|null[]} matches 
     */
    static getMatches(regex, string, vars = 1) {
        return string.match(regex)?.slice(1) ?? Array(vars).fill(null)
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
   static matchesCriteria(fn, criteria, unformatted, event = null, formatted = null) {
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

    /**
     * Adds a string to the end of an ichatcomponent
     * @param {net.minecraft.util.IChatComponent} ichatcomponent 
     * @param {String} message
     */
    static append = (ichatcomponent, message) => ichatcomponent.func_150258_a(`${ this.NWJN } ${ message.addColor() }`)

    /**
     * @param {String[]} tab 
     * @param {RegExp} startRegex 
     * @param {RegExp} endRegex 
     * @returns {?String[]}
     */
    static getTabBlock(tab, startRegex, endRegex = /^\s[A-Z]/) {
        const startIndex = tab.findIndex(it => startRegex.test(it))
        const endIndex = tab.findIndex((it, i) => ~startIndex && i > startIndex && !endRegex.test(it))

        return ~startIndex && ~endIndex ? tab.slice(startIndex + 1, endIndex) : null
    }

    /**
     * Strips rank and tags from player
     * @param {String} string
     * @returns {String} Player ign
     */
    static getSenderName = (string) => string.removeFormatting().split("] ").slice(-1).toString().replace(/\W/g, "")

    static getKeyFromValue(obj, value) {
        return Object.keys(obj).find(k => obj[k] === value)
    }
}

// internal mod fns
/**
 * For sending data and info
 * @param {String} message 
 */
export const log = (message)  => ChatLib.chat(`${TextUtil.NWJN} > ${message}`)

/**
 * For sending guides and important stuff
 * @param {String} message 
 */
export const notify = (message) => ChatLib.chat(`${TextUtil.NWJNADDONS} ${message}`)