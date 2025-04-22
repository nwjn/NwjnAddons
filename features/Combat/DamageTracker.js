import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"

const setting = new ConfigProperty("Switch", {
    category: "Combat",
    configName: "DamageTracker",
    title: "Damage Tracker",
    description: "Displays damage tags in chat"
})

new class extends Feature {
    constructor() {
        super({setting})

        this.addEvent("packetReceived", this.onSkyblockDamageSplash.bind(this), {
            setFilteredClass: net.minecraft.network.play.server.S0FPacketSpawnMob
        })
    }

    /**
     * @Event PacketReceived
     * @Modifier net.minecraft.network.play.server.S0FPacketSpawnMob
     */
    onSkyblockDamageSplash(packet) {
        // ArmorStand EntityType is 30
        if (packet./* getEntityType */func_149025_e() !== 30) return

        const watchers = packet./* getWatcherList */func_149027_c()
        for (let i = 0; i < watchers.length; i++) {
            let watcher = watchers[i]
            if (watcher./* getObjectType */func_75674_c() !== 4) continue

            let nametag = watcher./* getObject */func_75669_b()
            if (!nametag || /\s|^§\w\D$/.test(nametag)) continue

            Nwjn.chat(nametag)
            break
        }
    }
}