import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import { scheduleTask } from "../../utils/Ticker";
import EntityUtil from "../../core/static/EntityUtil";

new Feature("deathAnimation")
  .addEvent(
    new Event(EventEnums.ENTITY.DEATH, (entity) => {
      const mcEntity = entity.entity
      mcEntity.func_70106_y() // setDead
      
      scheduleTask(() => 
        EntityUtil.getMobStandTag(mcEntity)
          ?.func_70106_y() // setDead if fn returns the armorstand tag
      )
    })
  )