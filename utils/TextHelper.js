// Credit DocilElm
const numberFormat = { undefined: 1, "k": 1_000, "m": 1_000_000, "b": 1_000_000_000 }

export class TextHelper {
    static PREFIX = "§0§l[§c§lNwjn§0§l]§r"
    static NAME = "§0§l[§c§lNwjnAddons§0§l]§r"
    static VERSION = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).version

    static RADIAN = Math.PI / 180
    
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

    static addCommas(number, seperator = ',') {
        return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, seperator) ?? number
    }

    /**
     * - Gets the extra attributes of the Item
     * @param {Item} item 
     * @returns {Object}
     */
    static getExtraAttribute(item) {
        return item?.getNBT()?.toObject()?.tag?.ExtraAttributes
    }

    // From BloomCore
    /**
     * - Gets the Skyblock item ID of the given MCItem or CT Item
     * @param {Item} item 
     */
    static getSkyblockItemID(item) {
        if (item === null) return null

        const extraAttributes = this.getExtraAttribute(item)
        const itemID = extraAttributes?.getString("id")

        if (itemID !== "ENCHANTED_BOOK") return itemID
        
        // Enchanted books are a pain in the ass
        const enchantments = extraAttributes.getCompoundTag("enchantments")
        const enchants = [...enchantments.getKeySet()]

        if (!enchants.length) return

        const enchantment = enchants[0]
        const level = enchantments.getInteger(enchants[0])

        return `ENCHANTMENT_${enchantment.toUpperCase()}_${level}`
    }

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
     * - Converts a string into it's value in number e.g 1.2k to 1200
     * @param {String} string 
     * @returns {Number}
     */
    static convertToNumber(string) {
        const [ _, number, format ] = string.toLowerCase().match(/([\d\.,]+)([kmb])?/)

        return parseFloat(number) * numberFormat[format]
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

    static floors() {
        return {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven"
        }
    }

    static tiers() {
        return {
            1: "basic",
            2: "hot",
            3: "burning",
            4: "fiery",
            5: "infernal"
        }
    }
}