import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"

const setting = new ConfigProperty("Switch", {
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "enableSpawnClutter",
    title: "§e✯§r §bAbort Junk-Spawns",
    description: `Completely cancels the construction of many unused + non-performative entities`,
    value: true
})
const options = new ConfigProperty("MultiCheckbox", {
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "spawnClutterOptions",
    title: "➤ §e✯§r §bRemoval Customization",
    description: "     Optional toggles for a few entities",
    placeHolder: "Edit",
    options: [
        { title: "§e✯§r Falling Blocks", configName: "spawnClutterFalling", value: true },
        { title: "§e✯§r Arrows", configName: "spawnClutterArrow", value: true },
        { title: "Damage Stands", configName: "spawnClutterStand", value: false },
        { title: "Fishing Hooks", configName: "spawnClutterHook", value: false },
        { title: "Dropped Items", configName: "spawnClutterItem", value: false },
        { title: "Fireballs", configName: "spawnClutterFireball", value: true },
        { title: "Primed TNT", configName: "spawnClutterTNT", value: true },
        { title: "Eggs", configName: "spawnClutterEgg", value: true },
        { title: "Snowballs", configName: "spawnClutterSnowball", value: true },
        { title: "Boats", configName: "spawnClutterBoat", value: true },
        { title: "Minecarts", configName: "spawnClutterMinecart", value: true },
        { title: "Potions", configName: "spawnClutterPotion", value: true },
        { title: "XP Bottles", configName: "spawnClutterXP", value: true },
        { title: "XP Orbs", configName: "spawnClutterOrb", value: true },
        { title: "Paintings", configName: "spawnClutterArt", value: true },
        { title: "Rockets", configName: "spawnClutterRocket", value: true },
        { title: "Leashes", configName: "spawnClutterLeash", value: true }
    ],
    shouldShow: data => data.enableSpawnClutter
})

/** 
 * Check link for type list
 * @see {https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/entity/EntityTrackerEntry.java} ctrl-f S0EPacketSpawnObject
 */
const TYPE_SETTING_MAP = {
     1: "Boat",
     2: "Item",
    10: "Minecart",
    50: "TNT",
    60: "Arrow",
    61: "Snowball",
    62: "Egg",
    63: "Fireball",
    64: "Fireball",
    70: "Falling",
    73: "Potion",
    75: "XP",
    76: "Rocket",
    77: "Leash",
    78: "Stand",
    90: "Hook"
}
new class extends Feature {
    constructor() {
        super({setting})

        this.addEvent("PacketReceived", this.onSpawnObject.bind(this), { setFilteredClass: "SpawnObject" })
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnPainting" }, () => options.spawnClutterArt.value,)
        this.addSubEvent("PacketReceived", this.onStupidPacket.bind(this), { setFilteredClass: "SpawnExperienceOrb" }, () => options.spawnClutterOrb.value)
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnObject
     */
    onSpawnObject(packet, event) {
        if (TYPE_SETTING_MAP[packet./* getType */func_148993_l()]) cancel(event)
    }

    /**
     * @Event PacketReceived
     * @Modifier [SpawnPainting, SpawnExperienceOrb]
     */
    onStupidPacket(_, event) {
        cancel(event)
    }

    postInit() {
        Object.entries(TYPE_SETTING_MAP).forEach(([id, name]) => {
            const option = options[`spawnClutter${name}`]
            TYPE_SETTING_MAP[id] = option.value

            option._registerListener((_, val) => TYPE_SETTING_MAP[id] = val)
        })

        options.spawnClutterArt._registerListener(this.update.bind(this))
        options.spawnClutterOrb._registerListener(this.update.bind(this))
    }
}