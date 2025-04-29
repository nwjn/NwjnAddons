import Feature from "../../libs/Features/Feature"
import Nwjn from "../../libs/Helper/Nwjn"
import ConfigProperty from "../../data/ConfigProperty"

const setting = new ConfigProperty("Switch", {
    category: "General",
    configName: "SkyblockXP",
    title: "Skyblock XP Gain Message",
    description: "Displays skyblock xp gains in chat"
})

const XP_GAIN_REGEX = /\s{5}\+(\d{1,3}) SkyBlock XP (\(.+\)) \((\d{1,2})\/100\)\s{5}/
new class extends Feature {
    constructor() {
        super({setting})

        this.addEvent("ActionBarChange", this.onSkyblockXpGained.bind(this), { setCriteria: XP_GAIN_REGEX })
    }

    /**
     * @Event ActionBarChange
     * @Modifier /\s{5}\+(\d{1,3}) SkyBlock XP (\(.+\)) \((\d{1,2})\/100\)\s{5}/
     */
    onSkyblockXpGained(xp, category, progress) {
        const hashCode = 30000 + (~~xp + ~~progress)
        
        Nwjn.edit(`§b+${xp} SkyBlock XP §7${category} §b(${progress}/100)`, hashCode)
    }
}