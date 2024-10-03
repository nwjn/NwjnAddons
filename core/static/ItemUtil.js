export default class ItemUtil {
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
}