import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Performance",
                subcategory: "Death Clutter",
                configName: "DeathClutter",
                title: "§e✯§r §bRemove Dying Mobs and Names",
                description: "Fully kills the entity before it can perform the animation & removes the entity's nametag",
                value: true
            }),
        
            options: new ConfigProperty("MultiCheckbox", {
                category: "Performance",
                subcategory: "Death Clutter",
                configName: "DeathClutterOptions",
                title: "➤ §e✯§r §bRemoval Customization",
                description: "     Options to only delete entity, nametag, or both",
                placeHolder: "Edit",
                options: [
                    { title: "§e✯§r Dead Entities", configName: "DeathClutterEntities", value: true, registerListener: this.update.bind(this) },
                    { title: "§e✯§r Entity Nametag", configName: "DeathClutterNametag", value: true, registerListener: this.update.bind(this) }
                ],
                shouldShow: data => data.DeathClutter
            }),

            MOB_NAME_REGEX: / (§.)*0(§.)*[\/❤]/
        })
        
        this.addSubEvent("LivingDeathEvent", this.onEntityDeath.bind(this), () => this.options.DeathClutterEntities.value)
        this.addSubEvent("PacketReceived", this.onSkyblockNameSpawnedDead.bind(this), { setFilteredClass: "SpawnMob" }, () => this.options.DeathClutterNametag.value)
        this.addSubEvent("PacketReceived", this.onSkyblockNameDeath.bind(this), { setFilteredClass: "EntityMetadata" }, () => this.options.DeathClutterNametag.value)
    }

    onSkyblockNameSpawnedDead(packet, event) {
        if (packet./* getEntityType */func_149025_e() !== 30) return

        const WatchList = packet?./* getWatcherList */func_149027_c()
        if (!WatchList) return

        for (let watcher of WatchList) {
            if (watcher./* getObjectType */func_75674_c() !== 4) continue

            let object = watcher./* getObject */func_75669_b()
            if (object && this.MOB_NAME_REGEX.test(object)) 
                return cancel(event)
        }
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
        if (object && this.MOB_NAME_REGEX.test(object)) 
            return MobUtil.removeEntityByID(packet./* getEntityId */func_149375_d())
    }

    /**
     * @Event LivingDeath
     */
    onEntityDeath({entity}) {
        MobUtil.removeEntity(entity)
    }
}