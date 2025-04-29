import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"

const setting = new ConfigProperty("Switch", {
    category: "Performance",
    subcategory: "Death Clutter",
    configName: "DeathClutter",
    title: "§e✯§r §bRemove Dying Mobs and Names",
    description: "Fully kills the entity before it can perform the animation & removes the entity's nametag",
    value: true
})

new class extends Feature {
    constructor() {
        super({setting})
        
        this.addEvent("LivingDeath", this.onEntityDeath.bind(this))
        this.addEvent("PacketReceived", this.onSkyblockNameDeath.bind(this), { setFilteredClass: "EntityMetadata" })
    }

    /**
     * @Event PacketReceived
     * @Modifier EntityMetadata
     */
    onSkyblockNameDeath(packet) {
        // Nametag changes always have only one watcher
        const WatchList = packet./* getWatcherList */func_149376_c()
        if (WatchList?.length !== 1) return
        
        const object = WatchList[0]./* getObject */func_75669_b()
        if (object && / (§.)*0(§.)*[\/❤]/.test(object)) MobUtil.removeEntityByID(packet./* getEntityId */func_149375_d())
    }

    /**
     * @Event LivingDeath
     */
    onEntityDeath({entity}) {
        MobUtil.removeEntity(entity)
    }
}