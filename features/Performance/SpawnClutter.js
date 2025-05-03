import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"

const setting = new ConfigProperty("Switch", {
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "SpawnClutter",
    title: "§e✯§r §bAbort Junk-Spawns",
    description: `Completely cancels the construction of many unused + non-performative entities`,
    value: true
})
const options = new ConfigProperty("MultiCheckbox", {
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "SpawnClutterOptions",
    title: "➤ §e✯§r §bRemoval Customization",
    description: "     Optional toggles for a few entities",
    placeHolder: "Edit",
    options: [
        { title: "§e✯§r Falling Blocks", configName: "SpawnClutterFalling", value: true },
        { title: "§e✯§r Arrows", configName: "SpawnClutterArrow", value: true },
        { title: "Dropped Items", configName: "SpawnClutterItem", value: false },
        { title: "Fireballs", configName: "SpawnClutterFireball", value: true },
        { title: "Primed TNT", configName: "SpawnClutterTNT", value: true },
        { title: "Eggs", configName: "SpawnClutterEgg", value: true },
        { title: "Snowballs", configName: "SpawnClutterSnowball", value: true },
        { title: "Boats", configName: "SpawnClutterBoat", value: true },
        { title: "Minecarts", configName: "SpawnClutterMinecart", value: true },
        { title: "Potions", configName: "SpawnClutterPotion", value: true },
        { title: "XP Bottles", configName: "SpawnClutterXP", value: true },
        { title: "XP Orbs", configName: "SpawnClutterOrb", value: true },
        { title: "Paintings", configName: "SpawnClutterArt", value: true },
        { title: "Rockets", configName: "SpawnClutterRocket", value: true },
        { title: "Leashes", configName: "SpawnClutterLeash", value: true }
    ],
    shouldShow: data => data.SpawnClutter,
    registerListener: (o, c, n) => print(`${n} change: ${o} -> ${c}`)
})

/** 
 * Check link for type list
 * @see {https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/entity/EntityTrackerEntry.java} ctrl-f S0EPacketSpawnObject
 */
const TYPE_SETTING_MAP = {
     1: () => options.SpawnClutterBoat.value,
     2: () => options.SpawnClutterItem.value,
    10: () => options.SpawnClutterMinecart.value,
    50: () => options.SpawnClutterTNT.value,
    60: () => options.SpawnClutterArrow.value,
    61: () => options.SpawnClutterSnowball.value,
    62: () => options.SpawnClutterEgg.value,
    63: () => options.SpawnClutterFireball.value,
    64: () => options.SpawnClutterFireball.value,
    70: () => options.SpawnClutterFalling.value,
    73: () => options.SpawnClutterPotion.value,
    75: () => options.SpawnClutterXP.value,
    76: () => options.SpawnClutterRocket.value,
    77: () => options.SpawnClutterLeash.value
}
new class extends Feature {
    constructor() {
        super({setting})

        this.addEvent("PacketReceived", this.onSpawnObject.bind(this), { setFilteredClass: "SpawnObject" })
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnPainting" }, () => options.SpawnClutterArt.value)
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnExperienceOrb" }, () => options.SpawnClutterOrb.value)
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnObject
     */
    onSpawnObject(packet, event) {
        const type = packet./* getType */func_148993_l()
        if (type in TYPE_SETTING_MAP && TYPE_SETTING_MAP[type]()) cancel(event)
    }

    /**
     * @Event PacketReceived
     * @Modifier [ SpawnPainting, SpawnExperienceOrb ]
     */
    onStupidPacket(_, event) {
        cancel(event)
    }

    postInit() {
        options.SpawnClutterArt._registerListener(this.update.bind(this))
        options.SpawnClutterOrb._registerListener(this.update.bind(this))
    }
}