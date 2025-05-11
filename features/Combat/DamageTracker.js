import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Combat",
                configName: "DamageTracker",
                title: "Damage Tracker",
                description: "Displays damage tags in chat"
            }),
        
            ARMOR_STAND_TYPE: 30,
            STRING_WATCHER_TYPE: 4
        })

        this.addEvent("PacketReceived", this.onSkyblockDamageSplash.bind(this), { setFilteredClass: "SpawnMob" })
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnMob
     */
    onSkyblockDamageSplash(packet) {
        if (packet./* getEntityType */func_149025_e() !== this.ARMOR_STAND_TYPE) return

        const watchers = packet./* getWatcherList */func_149027_c()
        for (let watcher of watchers) {
            if (watcher./* getObjectType */func_75674_c() !== this.STRING_WATCHER_TYPE) continue

            let nametag = watcher./* getObject */func_75669_b()
            if (!nametag || /\s|^§\w\D$/.test(nametag)) continue

            return Nwjn.chat(nametag)
        }
    }
}