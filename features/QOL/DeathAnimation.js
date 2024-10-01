import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import { scheduleTask } from "../../core/CustomRegisters";

new Feature("deathAnimation")
  .addEvent(
    new Event(EventEnums.ENTITY.DEATH, (entity) => {
      const mcEntity = entity.entity
      mcEntity.func_70106_y() // setDead

      scheduleTask(() => {
        // Credit: SkyHanni
        const tagEntity = World.getWorld().func_73045_a( // getEntityByID
          mcEntity.func_145782_y() + 1 // getEntityID, + 1 gets next entity
        )
        if (tagEntity instanceof net.minecraft.entity.item.EntityArmorStand) tagEntity.func_70106_y() // setDead
      })
    })
  )