import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";
import DraggableGui from "../../utils/DraggableGui";
import ItemUtil from "../../core/static/ItemUtil";
import { addCountdown } from "../../utils/Ticker";

const ReaperOverlay = new DraggableGui({
  name: "Reaper",
  example: "Reaper: 0.00s",
  setting: "reaperTimer",
  command: "nwjnReaper"
})
const draw = (time) => 
  ReaperOverlay.drawText(
    time > 0 ? `Reaper: ${ time.toFixed(2) }s` : ""
  )


new Feature("reaperTimer")
  .addEvent(
    new Event(EventEnums.CLIENT.SOUNDPLAY, () => {
      if (
        ItemUtil.getSkyblockItemID(Player.armor.getChestplate())
        !==
        "REAPER_CHESTPLATE"
      ) return
        
      addCountdown((time) => draw(time), 6)
    }, "mob.zombie.remedy")
  )