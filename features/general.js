import Settings from "../config";
import { data, statsDisplay } from "../utils/constants";

let clearJoinMsg = false;

// Credit: Ghosts for Rendering overlay inspiration
// Credit: SkyblockUtilities for tab getname inspiratoin
// TODO: Make it so you can select which stats you want to show up.
register("renderOverlay", () => {
  if (Settings.stats) {
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Speed: ✦") || ChatLib.removeFormatting(name).trim().includes("Strength: ❁") || ChatLib.removeFormatting(name).trim().includes("Crit Chance: ☣") || ChatLib.removeFormatting(name).trim().includes("Crit Damage: ☠") || ChatLib.removeFormatting(name).trim().includes("Attack Speed: ⚔") || ChatLib.removeFormatting(name).trim().includes("Farming Fortune: ☘")) {
          if (ChatLib.removeFormatting(name).trim().includes("Speed: ✦")) {
            var Speed_txt = name;
            if (Settings.speedToggle) {
              Renderer.drawStringWithShadow(`${ Speed_txt }`, data.statsX, data.statsY);
            }
          }
          if (ChatLib.removeFormatting(name).trim().includes("Strength: ❁")) {
            var Strength_txt = name;
            if (Settings.strengthToggle) {
              if (Settings.speedToggle) {
                Renderer.drawStringWithShadow(`\n${ Strength_txt }`, data.statsX, data.statsY);
              }
              else {
                Renderer.drawStringWithShadow(`${ Strength_txt }`, data.statsX, data.statsY);
              }
            }
          }
          if (ChatLib.removeFormatting(name).trim().includes("Crit Chance: ☣")) {
            var CritChance_txt = name;
            if (Settings.critchanceToggle) {
              if (Settings.strengthToggle & Settings.speedToggle) {
                Renderer.drawStringWithShadow(`\n\n${ CritChance_txt }`, data.statsX, data.statsY);
              }
              else if (Settings.speedToggle || Settings.strengthToggle) {
                Renderer.drawStringWithShadow(`\n${ CritChance_txt }`, data.statsX, data.statsY);
              }
              else {
                Renderer.drawStringWithShadow(`${ CritChance_txt }`, data.statsX, data.statsY);
              }
            }
          }
          if (ChatLib.removeFormatting(name).trim().includes("Crit Damage: ☠")) {
            var CritDamage_txt = name;
            if (Settings.critdamageToggle) {
              if (Settings.speedToggle & Settings.strengthToggle & Settings.critchanceToggle) {
                Renderer.drawStringWithShadow(`\n\n\n${ CritDamage_txt }`, data.statsX, data.statsY);
              }
              else if ((Settings.speedToggle & Settings.strengthToggle) || (Settings.speedToggle & Settings.strengthToggle) || (Settings.speedToggle & Settings.critchanceToggle)) {
                Renderer.drawStringWithShadow(`\n\n${ CritDamage_txt }`, data.statsX, data.statsY);
              }
              else if (Settings.speedToggle || Settings.strengthToggle || Settings.critchanceToggle) {
                Renderer.drawStringWithShadow(`\n${ CritDamage_txt }`, data.statsX, data.statsY);
              }
              else {
                Renderer.drawStringWithShadow(`${ CritDamage_txt }`, data.statsX, data.statsY);
              }
            }
          }
          if (ChatLib.removeFormatting(name).trim().includes("Attack Speed: ⚔")) {
            var AttackSpeed_txt = name;
            if (Settings.attackspeedToggle) {
              if (Settings.speedToggle & Settings.strengthToggle & Settings.critchanceToggle & Settings.critdamageToggle) {
                Renderer.drawStringWithShadow(`\n\n\n\n${ AttackSpeed_txt }`, data.statsX, data.statsY);
              }
              else if ((Settings.speedToggle & Settings.strengthToggle & Settings.critchanceToggle) || (Settings.speedToggle & Settings.strengthToggle & Settings.critdamageToggle) || (Settings.speedToggle & Settings.critchanceToggle & Settings.critdamageToggle) || (Settings.strengthToggle & Settings.critchanceToggle & Settings.critdamageToggle)) {
                Renderer.drawStringWithShadow(`\n\n\n${ AttackSpeed_txt }`, data.statsX, data.statsY);
              }
              else if ((Settings.speedToggle & Settings.strengthToggle) || (Settings.speedToggle & Settings.critchanceToggle) || (Settings.speedToggle & Settings.critdamageToggle) || (Settings.strengthToggle & Settings.critchanceToggle) || (Settings.strengthToggle & Settings.critdamageToggle) || (Settings.critchanceToggle & Settings.critdamageToggle)) {
                Renderer.drawStringWithShadow(`\n\n${ AttackSpeed_txt }`, data.statsX, data.statsY);
              }
              else if (Settings.speedToggle || Settings.strengthToggle || Settings.critchanceToggle || Settings.critdamageToggle) {
                Renderer.drawStringWithShadow(`\n${ AttackSpeed_txt }`, data.statsX, data.statsY);
              }
              else {
                Renderer.drawStringWithShadow(`${ AttackSpeed_txt }`, data.statsX, data.statsY);
              }
            }
          }
            if (ChatLib.removeFormatting(name).trim().includes("Farming Fortune: ☘")) {
              var FarmingFortune_txt = name;
              if (Settings.farmingfortuneToggle) {
                if (Settings.speedToggle) {
                  Renderer.drawStringWithShadow(`\n${ FarmingFortune_txt }`, data.statsX, data.statsY);
                }
                else {
                  Renderer.drawStringWithShadow(`${ FarmingFortune_txt }`, data.statsX, data.statsY);
                }
              }
            }
          
        }
      })
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