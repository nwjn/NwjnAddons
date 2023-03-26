/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";
import { data, statsDisplay, consts, short_number } from "../utils/constants";

let clearJoinMsg = false;

// Credit: Ghosts for Rendering overlay inspiration
// Credit: SkyblockUtilities for tab getname inspiratoin
register("renderOverlay", () => {
  if (Settings.stats) {
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Speed: ✦") || ChatLib.removeFormatting(name).trim().includes("Strength: ❁") || ChatLib.removeFormatting(name).trim().includes("Crit Chance: ☣") || ChatLib.removeFormatting(name).trim().includes("Crit Damage: ☠") || ChatLib.removeFormatting(name).trim().includes("Attack Speed: ⚔") || ChatLib.removeFormatting(name).trim().includes("Farming Fortune: ☘")) {
          if (ChatLib.removeFormatting(name).trim().includes("Speed: ✦")) {
            var Speed_txt = name
            Renderer.drawStringWithShadow(`${ Speed_txt }`, data.statsX, data.statsY);
          }
          if (ChatLib.removeFormatting(name).trim().includes("Strength: ❁")) {
            var Strength_txt = name
            Renderer.drawStringWithShadow(`\n${ Strength_txt }`, data.statsX, data.statsY);
          }
          if (ChatLib.removeFormatting(name).trim().includes("Crit Chance: ☣")) {
            var CritChance_txt = name
            Renderer.drawStringWithShadow(`\n\n${ CritChance_txt }`, data.statsX, data.statsY);
          }
          if (ChatLib.removeFormatting(name).trim().includes("Crit Damage: ☠")) {
            var CritDamage_txt = name
            Renderer.drawStringWithShadow(`\n\n\n${ CritDamage_txt }`, data.statsX, data.statsY);
          }
          if (ChatLib.removeFormatting(name).trim().includes("Attack Speed: ⚔")) {
            var AttackSpeed_txt = name
            Renderer.drawStringWithShadow(`\n\n\n\n${ AttackSpeed_txt }`, data.statsX, data.statsY);
          }
          if (ChatLib.removeFormatting(name).trim().includes("Farming Fortune: ☘")) {
            var FarmingFortune_txt = name
            Renderer.drawStringWithShadow(`\n${ FarmingFortune_txt }`, data.statsX, data.statsY);
          }
        }
      });
    } catch (e) { }
  }
})

statsDisplay.registerClicked((x, y, button_num) => {
  data.statsX = x
  data.statsY = y
  data.save();
})

// Credit: NoSkywarsSpam for clear messages
register("chat", function (e) {
  if (Settings.inLobby) {
    clearJoinMsg = true;
    cancel(e);
  }
}).setChatCriteria(" joined the lobby!").setParameter("<c>")

register("chat", function (e) {
  if (Settings.inLobby) {
    clearJoinMsg = true;
    cancel(e)
  }
}).setChatCriteria(" Mystery Box!").setParameter("<c>")