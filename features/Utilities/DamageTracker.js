import Feature from "../../core/Feature.js";
import { Event } from "../../core/Event.js";
import EventEnums from "../../core/EventEnums.js";

new Feature("damageTracker")
  .addEvent(
    new Event(EventEnums.PACKET.SERVER.SPAWNMOB, (entityID) => {
      const entity = World.getWorld().func_73045_a(entityID)

      if (!(entity instanceof net.minecraft.entity.item.EntityArmorStand)) return
      const name = entity.func_95999_t()

      if (!(/[^A-Za-z:-_.#]/.test(name?.removeFormatting()))) return
      ChatLib.chat(name)
    })
  )