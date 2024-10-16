// import Settings from "../Settings"
// import { registerWhen } from "../utils/functions.js"

// let lastBar = "";
//   registerWhen(register("actionBar", (event) => {
//   let chat = ChatLib.getChatMessage(event, false)
//   chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
//   if (lastBar == chat) return
//   ChatLib.chat(chat)
//   lastBar = chat
// }).setCriteria("+${*} SkyBlock XP").setContains(), () => Settings().sbxp);