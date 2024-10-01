// import Settings from "../Settings"
// import { registerWhen } from "../utils/functions.js"


// let reaperUsed = 0
// registerWhen(register("soundPlay", () => {
//   const armor = Player.armor.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
//   if (armor == "REAPER_CHESTPLATE") reaperUsed = Date.now()
// }).setCriteria("mob.zombie.remedy"), () => Settings().reaper);

// registerWhen(register("renderOverlay", () => {
//   const reaperTime = 6 - (Date.now() - reaperUsed) / 1000
//   if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
// }), () => Settings().reaper);

// let lastBar = "";
//   registerWhen(register("actionBar", (event) => {
//   let chat = ChatLib.getChatMessage(event, false)
//   chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
//   if (lastBar == chat) return
//   ChatLib.chat(chat)
//   lastBar = chat
// }).setCriteria("+${*} SkyBlock XP").setContains(), () => Settings().sbxp);