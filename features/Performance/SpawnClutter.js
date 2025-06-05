import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"


/** 
 * Check link for type list
 * @see {https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/entity/EntityTrackerEntry.java} ctrl-f S0EPacketSpawnObject
*/
void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Performance",
                subcategory: "Spawn Clutter",
                configName: "SpawnClutter",
                title: "§e✯§r §bAbort Junk-Spawns",
                description: `Completely cancels the construction of many unused + non-performative entities`,
                value: true
            }),
        
            options: new ConfigProperty("MultiCheckbox", {
                category: "Performance",
                subcategory: "Spawn Clutter",
                configName: "SpawnClutterOptions",
                title: "➤ §e✯§r §bRemoval Customization",
                description: "     Optional toggles for a few entities",
                placeHolder: "Edit",
                options: [
                    { title: "§e✯§r Falling Blocks", configName: "SpawnClutterFalling", value: true },
                    { title: "§e✯§r Arrows", configName: "SpawnClutterArrow", value: true },
                    { title: "XP Orbs", configName: "SpawnClutterOrb", value: true, registerListener: this.update.bind(this) },
                    { title: "Paintings", configName: "SpawnClutterArt", value: true, registerListener: this.update.bind(this) },
                    { title: "Potions", configName: "SpawnClutterPotion", value: true },
                    { title: "Fireballs", configName: "SpawnClutterFireball", value: true },
                    { title: "Snowballs", configName: "SpawnClutterSnowball", value: true },
                    { title: "Eggs", configName: "SpawnClutterEgg", value: true },
                    { title: "Primed TNT", configName: "SpawnClutterTNT", value: true },
                    { title: "Dropped Items", configName: "SpawnClutterItem", value: false }
                ],
                shouldShow: data => data.SpawnClutter
            })
        })

        this.addEvent("PacketReceived", this.onSpawnObject.bind(this), { setFilteredClass: "SpawnObject" })
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnPainting" }, () => this.options.SpawnClutterArt.value)
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnExperienceOrb" }, () => this.options.SpawnClutterOrb.value)
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnObject
     */
    onSpawnObject(packet, event) {
        const type = packet./* getType */func_148993_l()
        const optFromType = this.TYPE_SETTING_MAP[type]
        if (!optFromType) return

        const isEnabled = this.options[`SpawnClutter${optFromType}`].value
        if (isEnabled) cancel(event)
    }

    /**
     * @Event PacketReceived
     * @Modifier [ SpawnPainting, SpawnExperienceOrb ]
     */
    onStupidPacket(_, event) {
        cancel(event)
    }

    postInit() {
        this.TYPE_SETTING_MAP = {
             2: "Item",
            50: "TNT",
            60: "Arrow",
            61: "Snowball",
            62: "Egg",
            63: "Fireball",
            64: "Fireball",
            70: "Falling",
            73: "Potion"
        }
    }
}