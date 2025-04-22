import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"

const category = "Performance"
const subcategory = "Spawn Clutter"

const setting = new ConfigProperty("Switch", {
    category,
    subcategory,
    configName: "SpawnClutter",
    title: "§e✯§r §bAbort Junk-Spawns",
    description: `Completely cancels the construction of many unused + non-performative entities`,
    value: true
})
const options = new ConfigProperty("MultiCheckbox", {
    category,
    subcategory,
    configName: "SpawnClutterOptions",
    title: "➤ §e✯§r §bAbort Junk-Spawns Customization",
    description: "     Optional toggles for a few entities",
    placeHolder: "Edit",
    options: [
        {
            title: "Arrows",
            configName: "SpawnClutterArrows"
        },
        {
            title: "§e✯§r Falling Blocks",
            configName: "SpawnClutterFallingBlocks",
            value: true
        }
    ],
    shouldShow: data => data.SpawnClutter
})

new class extends Feature {
    constructor() {
        super({setting})

        /** 
         * Check link for type list, notify me on discord if any of these types not to be edited or changed to have a setting
         * @see {https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/entity/EntityTrackerEntry.java} ctrl-f S0EPacketSpawnObject
         * @type {Set<Number>} 
         */
        this.blacklist = new Set([
            1,  // Boat
            10, // MineCart
            61, // Snowball
            62, // Egg
            63, // Fireball
            64, // SmallFireball
            66, // WitherSkull
            72, // EnderEye
            73, // Potion
            75, // ExpBottle
            76, // Rocket
            77 // Leash
        ])

        this.addEvent("packetReceived", this.onSpawnObject.bind(this), {
            setFilteredClass: net.minecraft.network.play.server.S0EPacketSpawnObject
        })
        this.addEvent("packetReceived", this.onStupidPacket.bind(this), { 
            setFilteredClasses: [
                net.minecraft.network.play.server.S10PacketSpawnPainting, 
                net.minecraft.network.play.server.S11PacketSpawnExperienceOrb
            ]
        })
    }

    /**
     * @Event PacketReceived
     * @Modifier net.minecraft.network.play.server.S0EPacketSpawnObject
     */
    onSpawnObject(packet, event) {
        if (this.blacklist.has(packet./* getType */func_148993_l())) cancel(event)
    }

    /**
     * @Event PacketReceived
     * @Modifier [net.minecraft.network.play.server.S10PacketSpawnPainting, net.minecraft.network.play.server.S11PacketSpawnExperienceOrb]
     */
    onStupidPacket(_, event) {
        cancel(event)
    }

    updateOptionals(id, flag) {
        if (flag) this.blacklist.add(id)
        else this.blacklist.delete(id)
    }

    postInit() {
        const { SpawnClutterArrows, SpawnClutterFallingBlocks } = options

        if (SpawnClutterArrows.value) this.blacklist.add(60)
        SpawnClutterArrows._registerListener((_, val) => this.updateOptionals(60, val))

        if (SpawnClutterFallingBlocks) this.blacklist.add(70)
        SpawnClutterFallingBlocks._registerListener((_, val) => this.updateOptionals(70, val))
    }
}