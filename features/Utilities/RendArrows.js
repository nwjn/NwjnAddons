import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import Feature from "../../core/Feature";
import ItemUtil from "../../core/static/ItemUtil";
import { scheduleTask } from "../../utils/Ticker";

let arrows = 0

new Feature("rendArrows")
  .addEvent(
    new Event(EventEnums.CLIENT.SOUNDPLAY, () => {
      const held = Player.getHeldItem()
      if (held && !ItemUtil.getExtraAttribute(Player.getHeldItem())?.enchantments?.ultimate_rend) return
      arrows++;
      if (arrows === 1) 
        scheduleTask(() => {
          ChatLib.chat(`Rend Arrows: ${ arrows - 1 }`);
          arrows = 0
        }, 5);
    }, "game.neutral.hurt")
  )