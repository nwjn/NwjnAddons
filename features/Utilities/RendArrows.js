import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import Feature from "../../core/Feature";
import { TextHelper } from "../../utils/TextHelper";
import { scheduleTask } from "../../core/CustomRegisters";

let arrows = 0

new Feature("rendArrows")
  .addEvent(
    new Event(EventEnums.CLIENT.SOUNDPLAY, () => {
      if (!TextHelper.getExtraAttribute(Player.getHeldItem())?.enchantments?.ultimate_rend) return
      arrows++;
      if (arrows === 1) 
        scheduleTask(() => {
          ChatLib.chat(`Rend Arrows: ${ arrows - 1 }`);
          arrows = 0
        }, 5);
    }, "game.neutral.hurt")
  )