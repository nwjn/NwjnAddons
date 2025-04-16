import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"

new class DamageTracker extends Feature {
    constructor() {
        super({setting: this.constructor.name})

        this.addEvent(
            "packetReceived",
            this.onSkyblockDamageSplash.bind(this),
            net.minecraft.network.play.server.S0FPacketSpawnMob
        )

        this.init()
    }

    /** @Packet {net.minecraft.network.play.server.S0FPacketSpawnMob} */
    onSkyblockDamageSplash(packet) {
        // ArmorStand EntityType is 30
        if (packet./* getEntityType */func_149025_e() !== 30) return

        const watchers = packet./* getWatcherList */func_149027_c()
        for (let i = 0; i < watchers.length; i++) {
            let watcher = watchers[i]
            if (watcher./* getObjectType */func_75674_c() !== 4) continue

            let nametag = watcher./* getObject */func_75669_b()
            if (!nametag || /[\s\+]/.test(nametag)) continue

            Nwjn.chat(nametag)
            break
        }
    }
}