// import Feature from "../../core/Feature";
// import { Event } from "../../core/Event";
// import EventEnums from "../../core/EventEnums";
// import DraggableGui from "../../utils/DraggableGui";

// const
// let reaperUsed = 0
// registerWhen(register("soundPlay", () => {
//   const armor = Player.armor.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
//   if (armor == "REAPER_CHESTPLATE") reaperUsed = Date.now()
// }).setCriteria("mob.zombie.remedy"), () => Settings().reaper);

// registerWhen(register("renderOverlay", () => {
//   const reaperTime = 6 - (Date.now() - reaperUsed) / 1000
//   if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
// }), () => Settings().reaper);

import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";
import DraggableGui from "../../utils/DraggableGui";
import ItemUtil from "../../core/static/ItemUtil";
import { addTimer } from "../../utils/Ticker";

const editGui = new DraggableGui({
  name: "Reaper",
  example: "Reaper: 0.00s",
  setting: "reaperTimer",
  command: "nwjnReaper"
})
editGui.drawText("Reaper: 0.00s")

new Feature("reaperTimer")
  .addEvent(
    new Event(EventEnums.CLIENT.SOUNDPLAY, () => {
      const id = ItemUtil.getSkyblockItemID(Player.armor.getChestplate())
      if (id === "REAPER_CHESTPLATE") addTimer(editGui, "Reaper:", 6)
    }, "mob.zombie.remedy")
  )