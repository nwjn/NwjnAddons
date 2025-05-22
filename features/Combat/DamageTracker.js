import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import NumUtil from "../../libs/Helper/NumUtil"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Combat",
                configName: "DamageTracker",
                title: "Damage Tracker",
                description: "Displays damage tags in chat"
            })
        })

        this.addEvent("PacketReceived", this.onSkyblockDamageSplash.bind(this), { setFilteredClass: "SpawnMob" })
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnMob
     */
    onSkyblockDamageSplash(packet) {
        if (packet./* getEntityType */func_149025_e() !== 30) return

        const watchers = packet./* getWatcherList */func_149027_c()
        for (let watcher of watchers) {
            if (watcher./* getObjectType */func_75674_c() !== 4) continue

            let nametag = watcher./* getObject */func_75669_b()
            if (!nametag || /\s|^§\w\D$/.test(nametag)) continue

            return Nwjn.chat(NumUtil.isFormatUS() ? nametag : nametag.replace(/,/g, "."))
        }
    }
}