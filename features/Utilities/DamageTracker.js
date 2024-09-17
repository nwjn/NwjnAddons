import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";
import { ENTITY, PACKET } from "../../utils/Constants.js";

const S0FPacketSpawnMob = PACKET.S0FPacketSpawnMob.class
const ARMOR_STAND = ENTITY.ArmorStand

registerWhen(register("packetReceived", (packet) => {
  Client.scheduleTask(1, () => {
    const entity = World.getWorld().func_73045_a(packet.func_149024_d())

    if (entity instanceof ARMOR_STAND) {
      const name = entity.func_95999_t()
      if (/[^A-Za-z:-_.#]/.test(name?.removeFormatting())) ChatLib.chat(name)
    }
  })
}).setFilteredClass(S0FPacketSpawnMob), () => Settings().damageTracker);