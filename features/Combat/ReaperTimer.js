import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import DraggableGui from "../../utils/DraggableGui";

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