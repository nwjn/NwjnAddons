import Feature from "../../libs/Features/Feature"
import MobUtil from "../../libs/Helper/MobUtil"

/**
 * Cleans up dead entities by: 
 * 1. Removing them on death and canceling their death animation
 * 2. Removing their armorstand nametag that stays for multiple ticks after death
 */
new class DeathClutter extends Feature {
    constructor() {
        super({setting: this.constructor.name})
        
        this.addEvent(net.minecraftforge.event.entity.living.LivingDeathEvent, this.onEntityDeath.bind(this))
        this.addEvent("packetReceived", this.onSkyblockNameDeath.bind(this), net.minecraft.network.play.server.S1CPacketEntityMetadata)

        this.init()
    }

    /** @Packet {net.minecraft.network.play.server.S1CPacketEntityMetadata} */
    onSkyblockNameDeath(packet) {
        // Nametag changes always have only one watcher
        const WatchList = packet./* getWatcherList */func_149376_c()
        if (WatchList?.length !== 1) return
        
        const object = WatchList[0]./* getObject */func_75669_b()
        if (object && / (§.)*0(§.)*[\/❤]/.test(object)) MobUtil.removeEntityByID(packet./* getEntityId */func_149375_d())
    }

    /** @Event {net.minecraftforge.event.entity.living.LivingDeathEvent} */
    onEntityDeath({entity}) {
        MobUtil.removeEntity(entity)
    }
}