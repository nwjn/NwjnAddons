import Feature from "../../libs/Features/Feature"
import Nwjn from "../../libs/Helper/Nwjn"

new class SkyblockXP extends Feature {
    constructor() {
        super({setting: this.constructor.name})

        this.addEvent(
            "actionBarChange",
            this.onSkyblockXpGained.bind(this),
            /\s{5}\+(\d{1,3}) SkyBlock XP (\(.+\)) \((\d{1,2})\/100\)\s{5}/
        )

        this.init()
    }

    onSkyblockXpGained(xp, category, progress) {
        const hashCode = 30000 + (~~xp + ~~progress)
        
        Nwjn.edit(`§b+${xp} SkyBlock XP §7${category} §b(${progress}/100)`, hashCode)
    }
}