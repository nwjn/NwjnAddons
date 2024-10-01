// import Settings from "../Settings"
// import { registerWhen } from "../utils/functions.js"


// const ARMOR_STAND_CLASS = net.minecraft.entity.item.EntityArmorStand
// registerWhen(register("entityDeath", (entity) => {
//   const mcEntity = entity.getEntity()
//   mcEntity.func_70106_y()

//   Client.scheduleTask(1, () => {
//     const stands = World.getWorld().func_72872_a(ARMOR_STAND_CLASS, mcEntity.func_174813_aQ().func_72314_b(3, 3, 3)).filter(e => e.toString().match(/§r §[^a]0§f\//g))
//     stands.forEach(stand => stand.func_70106_y())
//   })
// }), () => Settings().dead)

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