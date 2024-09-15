import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";

const S0FPacketSpawnMob = Java.type("net.minecraft.network.play.server.S0FPacketSpawnMob")
const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")

registerWhen(register("packetReceived", (packet) => {
  Client.scheduleTask(1, () => {
    const entity = World.getWorld().func_73045_a(packet.func_149024_d())

    if (entity instanceof EntityArmorStand) {
      const name = entity.func_95999_t()
      if (/[^A-Za-z:-_.#]/.test(name?.removeFormatting())) ChatLib.chat(name)
    }
  })
}).setFilteredClass(S0FPacketSpawnMob.class), () => Settings().damageTracker)