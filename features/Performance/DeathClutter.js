import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"

const setting = new ConfigProperty("Switch", {
    category: "Performance",
    subcategory: "Death Clutter",
    configName: "enableDeathClutter",
    title: "§e✯§r §bRemove Dying Mobs and Names",
    description: "Fully kills the entity before it can perform the animation & removes the entity's nametag",
    value: true
})
const options = new ConfigProperty("MultiCheckbox", {
    category: "Performance",
    subcategory: "Death Clutter",
    configName: "deathClutterOptions",
    title: "➤ §e✯§r §bRemoval Customization",
    description: "     Options to only delete entity, nametag, or both",
    placeHolder: "Edit",
    options: [
        { title: "§e✯§r Dead Entities", configName: "deathClutterEntities", value: true },
        { title: "§e✯§r Entity Nametag", configName: "deathClutterNametag", value: true }
    ],
    shouldShow: data => data.enableDeathClutter
})

new class extends Feature {
    constructor() {
        super({setting})
        
        this.addSubEvent("LivingDeath", this.onEntityDeath.bind(this), () => options.deathClutterEntities.value)
        this.addSubEvent("PacketReceived", this.onSkyblockNameDeath.bind(this), { setFilteredClass: "EntityMetadata" }, () => options.deathClutterNametag.value)
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

    postInit() {
        options.deathClutterEntities._registerListener(this.update.bind(this))
        options.deathClutterNametag._registerListener(this.update.bind(this))
    }
}