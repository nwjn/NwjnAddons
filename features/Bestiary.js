import settings from "../config";
import RenderLib from "RenderLib"
import { registerWhen } from "../utils/functions";
import { getWorld } from "../utils/world";

// TODO: ARMOR STANDS DONT TAKE SPACES IN ENTRY
const monsters = ["Blaze", "CaveSpider", "Creeper", "Enderman", "Endermite", "Ghast", "GiantZombie", "Golem", "Guardian", "IronGolem", "MagmaCube", "Mob", "PigZombie", "Silverfish", "Skeleton", "Slime", "Snowman", "Spider", "Witch", "Zombie"]
const passives = [`AmbientCreature`, `Animal`, `Bat`, `Chicken`, `Cow`, `Horse`, `Mooshroom`, `Ocelot`, `Pig`, `Rabbit`, `Sheep`, `Squid`, `Tameable`, `Villager`, `WaterMob`, `Wolf`]
registerWhen(register("renderWorld", () => {
  if (settings.monster != "") {
    let maxMonsterHPs = []
    settings.monster.split(",").forEach(entry => {
      if (entry.startsWith(" ")) entry = entry.replace(" ", "")
      let archiveMonsterEntry = entry
      if (entry.includes(")")) {
        let hp = entry.substring(entry.indexOf("(") + 1, entry.indexOf(")"))
        if (hp.includes("|")) {
          hp.split("|").forEach(hp2 => {
            hp2 = hp2.replace(/\.[1-9](b|B)/g, `${hp2.charAt(2)}00000000`)
            hp2 = hp2.replace(/b|B/g, "000000000")
            hp2 = hp2.replace(/\.[1-9](m|M)/g, `${hp2.charAt(2)}00000`)
            hp2 = hp2.replace(/m|M/g, "000000")
            hp2 = hp2.replace(/\.[1-9](k|K)/g, `${hp2.charAt(2)}00`)
            hp2 = hp2.replace(/k|K/g, "000")
            maxMonsterHPs.push(parseInt(hp2 + ".0"))
          })  
        }
        else if (!hp.includes("|")) {
          hp = hp.replace(/\.[1-9](b|B)/g, `${hp.charAt(2)}00000000`)
          hp = hp.replace(/b|B/g, "000000000")
          hp = hp.replace(/\.[1-9](m|M)/g, `${hp.charAt(2)}00000`)
          hp = hp.replace(/m|M/g, "000000")
          hp = hp.replace(/\.[1-9](k|K)/g, `${hp.charAt(2)}00`)
          hp = hp.replace(/k|K/g, "000")
          maxMonsterHPs.push(parseInt(hp + ".0"))
        }
      }
      
      try {
        monsters.forEach(monster => {
          if (entry.includes(")")) entry = entry.substring(0, entry.indexOf("("))
          if (!monster.includes(entry)) return
        })
        World.getAllEntitiesOfType(Java.type(`net.minecraft.entity.monster.Entity${ entry }`)).forEach(entity => {
          if (Player.asPlayerMP().distanceTo(entity) > settings.distance && !entity.isInvisible) return
          let maxHP = entity.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b()
          let currentHP = entity.getEntity().func_110143_aJ()
          if (currentHP <= 0) return
          if (!archiveMonsterEntry.includes(")") || maxMonsterHPs.includes(maxHP)) {
            RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), entity.getWidth(), entity.getHeight(), settings.monsterColor.getRed() / 255, settings.monsterColor.getGreen() / 255, settings.monsterColor.getBlue() / 255, 1, false)
          }
        })
      } catch (error){}
    })
  }
  if (settings.passive != "") {
    let maxPassiveHPs = []
    settings.passive.split(",").forEach(entry => {
      if (entry.startsWith(" ")) entry = entry.replace(" ", "")
      let archivePassiveEntry = entry
      if (entry.includes(")")) {
        let hp = entry.substring(entry.indexOf("(") + 1, entry.indexOf(")"))
        if (hp.includes("|")) {
          hp.split("|").forEach(hp2 => {
            hp2 = hp2.replace(/\.[1-9](b|B)/g, `${hp2.charAt(2)}00000000`)
            hp2 = hp2.replace(/b|B/g, "000000000")
            hp2 = hp2.replace(/\.[1-9](m|M)/g, `${hp2.charAt(2)}00000`)
            hp2 = hp2.replace(/m|M/g, "000000")
            hp2 = hp2.replace(/\.[1-9](k|K)/g, `${hp2.charAt(2)}00`)
            hp2 = hp2.replace(/k|K/g, "000")
            maxPassiveHPs.push(parseInt(hp2 + ".0"))
          })  
        }
        else if (!hp.includes("|")) {
          hp = hp.replace(/\.[1-9](b|B)/g, `${hp.charAt(2)}00000000`)
          hp = hp.replace(/b|B/g, "000000000")
          hp = hp.replace(/\.[1-9](m|M)/g, `${hp.charAt(2)}00000`)
          hp = hp.replace(/m|M/g, "000000")
          hp = hp.replace(/\.[1-9](k|K)/g, `${hp.charAt(2)}00`)
          hp = hp.replace(/k|K/g, "000")
          maxPassiveHPs.push(parseInt(hp + ".0"))
        }
      }
      try {
        passives.forEach(passive => {
          if (entry.includes(")")) entry = entry.substring(0, entry.indexOf("("))
          if (!passive.includes(entry)) return
        })
        World.getAllEntitiesOfType(Java.type(`net.minecraft.entity.passive.Entity${ entry }`)).forEach(entity => {
          if (Player.asPlayerMP().distanceTo(entity) > settings.distance && !entity.isInvisible) return
          let maxHP = entity.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b()
          let currentHP = entity.getEntity().func_110143_aJ()
          if (currentHP <= 0) return
          if (!archivePassiveEntry.includes(")") || maxPassiveHPs.includes(maxHP)) {
            RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), entity.getWidth(), entity.getHeight(), settings.passiveColor.getRed() / 255, settings.passiveColor.getGreen() / 255, settings.passiveColor.getBlue() / 255, 1, false)
          }
        })
      } catch (error){}
    })
  }
  if (settings.stand != "") {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
      if (stand.toString().includes("name=Armor Stand") || Player.asPlayerMP().distanceTo(stand) > settings.distance) return
      settings.stand.split(",").forEach(entry => {
        if (entry.startsWith(" ")) entry = entry.replace(" ", "")
        if (stand.getName().toLowerCase().includes(entry.toLowerCase())) {
          RenderLib.drawEspBox(stand.getX(), stand.getY(), stand.getZ(), 1, 1, settings.standColor.getRed() / 255, settings.standColor.getGreen() / 255, settings.standColor.getBlue() / 255, 1, false);
        }
      })
    })
  }
  if (settings.player != "") {
    World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP").class).forEach(player => {
      if (Player.asPlayerMP().distanceTo(player) > settings.distance) return
      let currentHP = player.getEntity().func_110143_aJ()
      if (currentHP <= 0) return
      if (settings.player == "Any") {
        RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, settings.playerColor.getRed() / 255, settings.playerColor.getGreen() / 255, settings.playerColor.getBlue() / 255, 1, false)
        return
      }
      else if (settings.player == "Player") {
        let ping = World.getPlayerByName(player.getName())?.getPing()
        if (ping != 1) return
        RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, settings.playerColor.getRed() / 255, settings.playerColor.getGreen() / 255, settings.playerColor.getBlue() / 255, 1, false)
        return
      }
      settings.player.split(",").forEach(entry => {
        if (entry.startsWith(" ")) entry = entry.replace(" ", "")
        if (player.getName().toLowerCase().includes(entry.toLowerCase())) {
          RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, settings.playerColor.getRed() / 255, settings.playerColor.getGreen() / 255, settings.playerColor.getBlue() / 255, 1, false);
        }
      })
    })
  }
}), () => (settings.monster != "" || settings.passive != "" || settings.stand != "" || settings.player != ""))

let matchoTitle = 0
let matchoEntities = 0

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP").class).forEach(matcho => {
    if (matcho.getName() == "matcho ") {
      RenderLib.drawEspBox(matcho.getX(), matcho.getY(), matcho.getZ(), matcho.getWidth(), matcho.getHeight(), 0, 1, 0, 1, false);
      if (Player.asPlayerMP().canSeeEntity(matcho)) {
        Tessellator.drawString(`Matcho`, matcho.getX(), matcho.getY() + matcho.getHeight() + 0.5, matcho.getZ(), 0x00ff00, false);
      }
      matchoTitle += 1
    }
    else if (matcho.getName() != "") {
      matchoEntities += 1;
    }
    if (matchoTitle == 1 && settings.matchoAlert && matcho.getName() == "matcho ") {
      Client.showTitle("&4Matcho!", "", 1, 1, 0);
    }
    else if (matchoEntities >= 500) {
      matchoTitle = 0;
      matchoEntities = 0;
    }
  })
}), () => getWorld() == "Crimson Isle" && settings.matcho)

let broodTitle = 0
let keeperTitle = 0
let broodEntities = 0
let keeperEntities = 0
registerWhen(register("renderWorld", () => {
  if (settings.broodmother) {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
      if (stand.getName().includes("Brood Mother")) {
        RenderLib.drawEspBox(stand.getX(), stand.getY(), stand.getZ(), 1, 1, 0, 1, 0, 1, false);
        if (Player.asPlayerMP().canSeeEntity(stand)) {
          Tessellator.drawString(`Brood Mother`, stand.getX(), stand.getY(), stand.getZ(), 0x00ff00, false);
        }
        broodTitle += 1
      }
      else if (stand.getName() != "") {
        broodEntities += 1;
      }
      if (broodTitle == 1 && settings.broodmotherAlert && stand.getName().includes("Brood Mother")) {
        Client.showTitle("&4Brood Mother!", "", 1, 1, 0);
      }
      else if (broodEntities >= 2000) {
        broodTitle = 0;
        broodEntities = 0;
      }
    })
  }
  if (settings.keeper) {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
      if (stand.getName().includes("Keeper") && stand.getY() < 95 && Player.getY() < 134) {
        RenderLib.drawEspBox(stand.getX(), stand.getY() - 0.7, stand.getZ(), 1, 1, 0, 1, 0, 1, false);
        if (Player.asPlayerMP().canSeeEntity(stand)) {
          Tessellator.drawString(`Keeper`, stand.getX(), stand.getY() + 1.5, stand.getZ(), 0x00ff00, false);
        }
        keeperTitle += 1
      }
      else if (stand.getName() != "") {
        keeperEntities += 1;
      }
      if (keeperTitle == 1 && settings.keeperAlert && stand.getName().includes("Keeper")) {
        Client.showTitle("&4Keeper!", "", 1, 1, 0);
      }
      else if (keeperEntities >= 2000) {
        title = 0;
        keeperEntities = 0;
      }
    })
  }
}), () => getWorld() == "Spider's Den" && (settings.broodmother || settings.keeper))


register("worldUnload", () => {
  matchoTitle = 0
  broodTitle = 0
  keeperTitle = 0
  matchoEntities = 0
  broodEntities = 0
  keeperEntities = 0
});