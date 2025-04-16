import Feature from "../../libs/Features/Feature";
import Settings from "../../data/Settings";

new class SpawnClutter extends Feature {
    constructor() {
        super({setting: this.constructor.name})

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

        this.initOptionals()

        this.addEvent(
            "spawnObject", 
            this.onSpawnObject.bind(this)
        )

        this.addEvent(
            "packetReceived", 
            this.onStupidPacket.bind(this), 
            net.minecraft.network.play.server.S10PacketSpawnPainting
        )

        this.addEvent(
            "packetReceived", 
            this.onStupidPacket.bind(this), 
            net.minecraft.network.play.server.S11PacketSpawnExperienceOrb
        )

        this.init()
    }

    onSpawnObject(type, event) {
        if (this.blacklist.has(type)) cancel(event)
    }

    onStupidPacket(_, event) {
        cancel(event)
    }

    initOptionals() {
        if (Settings.SpawnClutterArrows) this.blacklist.add(60)
        Settings.getConfig().registerListener("SpawnClutterArrows", (_, val) => this.updateOptionals(60, val))

        if (Settings.SpawnClutterFallingBlocks) this.blacklist.add(70)
        Settings.getConfig().registerListener("SpawnClutterFallingBlocks", (_, val) => this.updateOptionals(70, val))
    }

    updateOptionals(id, flag) {
        if (flag) this.blacklist.add(id)
        else this.blacklist.delete(id)
    }
}