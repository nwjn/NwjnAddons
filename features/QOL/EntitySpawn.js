import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import { scheduleTask } from "../../utils/Ticker";

const options = [
  ["fallingBlocks", net.minecraft.entity.item.EntityFallingBlock],
  ["xpOrbs", net.minecraft.entity.item.EntityXPOrb],
  ["arrows", net.minecraft.entity.projectile.EntityArrow],
  ["witherSkulls", net.minecraft.entity.projectile.EntityWitherSkull]
]

options.forEach(([setting, clazz]) => {
  new Feature(setting)
    .addEvent(
      new Event(EventEnums.ENTITY.JOINWORLD, (entity) => {
        scheduleTask(() => entity.func_70106_y())
      }, clazz)
    )
})