import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";

const criteria = new Map([
  ["fallingBlocks", net.minecraft.entity.item.EntityFallingBlock],
  ["xpOrbs", net.minecraft.entity.item.EntityXPOrb],
  ["arrows", net.minecraft.entity.projectile.EntityArrow],
  ["witherSkulls", net.minecraft.entity.projectile.EntityWitherSkull]
])

criteria.forEach((type, setting) => {
  registerWhen(register(EntityJoinWorldEvent, (event) => {
    if (event.entity instanceof type) cancel(event)
  }), () => Settings()[setting])
})

