import Feature from "../../core/Feature.js";
import { Event } from "../../core/Event.js";
import EventEnums from "../../core/EventEnums.js";

new Feature("damageTracker")
  .addEvent(
    new Event(EventEnums.ENTITY.SPAWNMOB, (entity) => {
      const name = entity.func_95999_t()

      if (!(/[^A-Za-z:-_.#]/.test(name?.removeFormatting()))) return
      ChatLib.chat(name)
    }, net.minecraft.entity.item.EntityArmorStand)
  )