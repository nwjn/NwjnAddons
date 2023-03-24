/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";

let clearJoinMsg = false;

register("chat", () => {
  ChatLib.say("/pc rer dorp? enchintad bonk {23% majik fin]")
}).setChatCriteria("&r&6&lRARE DROP! &r&fEnchanted Book&r")

register("chat", function (e) {
  clearJoinMsg = true;
  cancel(e)
}).setChatCriteria(" joined the lobby!").setParameter("<c>")
