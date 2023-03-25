/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";
import { data, statsDisplay, PREFIX, short_number } from "../utils/constants";

let clearJoinMsg = false;

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

register("renderOverlay", () => {
  if (Settings.stats) {
    if (statsDisplay.isOpen()) {
      const stats_txt = "&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r";
      Renderer.drawStringWithShadow(stats_txt, Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(stats_txt) / 2, Renderer.screen.getHeight() / 2);
    try {
      TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Speed: ✦") || ChatLib.removeFormatting(name).trim().includes("Strength: ❁") || ChatLib.removeFormatting(name).trim().includes("Crit Chance: ☣") || ChatLib.removeFormatting(name).trim().includes("Crit Damage: ☠") || ChatLib.removeFormatting(name).trim().includes("Attack Speed: ⚔")) {
        let Speed_txt = `&f&lSpeed:&f ✦${ short_number(data.Speed) }`;
        let Strength_txt = `&f&lStrength:&c ❁${ short_number(data.Strength) }`;
        let CritChance_txt = `&f&lCrit Chance:&9 ☣${ short_number(data.CritChance) }`;
        let CritDamage_txt = `&f&lCrit Damage:&9 ☠${ short_number(data.CritDamage) }`;
        let AttackSpeed_txt = `&f&lAttack Speed:&e ⚔${ short_number(data.AttackSpeed) }`;
        Renderer.drawStringWithShadow(`${ Speed_txt } \n${ Strength_txt } \n${ CritChance_txt } \n${ CritDamage_txt } \n${ AttackSpeed_txt }`, data.statsX, data.statsY);
        }
        });
      } catch (e) { }
    }
  }
})

register("dragged", (dx, dy, x, y) => {
  if (!statsDisplay.isOpen()) return
    data.statsX = x
    data.statsY = y
    data.save()
});
