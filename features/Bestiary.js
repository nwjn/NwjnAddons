import settings from "../config";
import RenderLib from "RenderLib"
import { delay, registerWhen } from "../utils/functions";
import { getWorld } from "../utils/world";
import { data } from "../utils/data";

const monsters = [
  "Blaze",
  "CaveSpider",
  "Creeper",
  "Enderman",
  "Endermite",
  "Ghast",
  "GiantZombie",
  "Golem",
  "Guardian",
  "IronGolem",
  "MagmaCube",
  "Mob",
  "PigZombie",
  "Silverfish",
  "Skeleton",
  "Slime",
  "Snowman",
  "Spider",
  "Witch",
  "Zombie"
];

const passives = [
  `AmbientCreature`,
  `Animal`,
  `Bat`,
  `Chicken`,
  `Cow`,
  `Horse`,
  `Mooshroom`,
  `Ocelot`,
  `Pig`,
  `Rabbit`,
  `Sheep`,
  `Squid`,
  `Villager`,
  `Wolf`
];

// TODO: ARMOR STANDS DONT TAKE SPACES IN ENTRY

export function setMobHighlight() {
  let mobsHighlight = {}
  if (!settings.rawMobList) {
    data.mobsHighlight = mobsHighlight
    data.save()
    return
  }
  /**
     * Raw entry in form:
     * `<Mob>(-\d[kKmMbB]?(|\d[kKmMbB]?)+)?`
     *    ^   ^            ^ Delimiter between each health value
     *    |   |- Delimiter between monster & health value(s)
     *    |- A monster from net.minecraft.entity.monster or net.minecraft.entity.passive
     */
  settings.rawMobList.split(",").forEach((entryRaw, idx) => {
    // Remove whitespace in each entry & convert to lowercase
    entryRaw = entryRaw.replace(/\s/g, "").toLowerCase()

    // Split on delimiter between monster & healths
    let [entryMob, hpsRaw] = entryRaw.split("-", 2)

    let monsterIdx = monsters.findIndex(monster => monster.toLowerCase() === entryMob)
    let passiveIdx = passives.findIndex(passive => passive.toLowerCase() === entryMob)
    let mobType
    let mob
    if (monsterIdx !== -1) {
      mobType = "monster"
      mob = monsters[monsterIdx]
    }
    else if (passiveIdx !== -1) {
      mobType = "passive"
      mob = passives[passiveIdx]
    }
    else return // Early return on entry if mob doesn't match either list

    let hps = []
    hpsRaw?.split("|")?.forEach(hpRaw => {
      let hp = parseFloat(hpRaw.match(/[\d\.]+/g))

      if (hpRaw.match(/k/gi)) hp *= 1_000
      if (hpRaw.match(/m/gi)) hp *= 1_000_000
      if (hpRaw.match(/b/gi)) hp *= 1_000_000_000
      hps.push(hp)
    });

    mobsHighlight = {
      ...mobsHighlight,
      [mob]: {
        mobType,
        hps,
      }
    }
  })
  data.mobsHighlight = mobsHighlight
  data.save()
}

let mobsHighlighted = {}
registerWhen(register("guiClosed", (event) => {
  if (event.toString().includes("vigilance")) {
    delay(() => {
      mobsHighlighted = {}
      Object.keys(data.mobsHighlight).forEach((mob) => {
        mobsHighlighted = {
          ...mobsHighlighted,
          [mob]: 0,
        }
      })
    }, 50);
  }
}), () => settings.rawMobList)

import { Overlay } from "../utils/overlay";
import { ARMOR_STANDS, PLAYERS } from "../utils/constants";
const mobCountExample = `&eZombie: 1`
const mobCountOverlay = new Overlay("mobEspCount", ["all"], () => true, data.mobCountL, "moveCount", mobCountExample);

registerWhen(register("renderWorld", () => {
  let mobsHighlight = data.mobsHighlight
  Object.entries(mobsHighlight).forEach(([mobHighlightKey, mobHighlightVal]) => {
    let num = 0
    World.getAllEntitiesOfType(
      Java.type(`net.minecraft.entity.${ mobHighlightVal.mobType }.Entity${ mobHighlightKey }`).class
    ).forEach(entity => {
      if (Player.asPlayerMP().distanceTo(entity) > settings.distance || entity.isInvisible()) return
      let maxHP = entity.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b()
      let currentHP = entity.getEntity().func_110143_aJ()
      if (currentHP <= 0) return
      if (mobHighlightVal.hps.length === 0 || mobHighlightVal.hps.includes(maxHP)) {
        RenderLib.drawEspBox(
          entity.getX(), 
          entity.getY(),
          entity.getZ(),
          entity.getWidth(),
          entity.getHeight(),
          settings[`${mobHighlightVal.mobType}HitboxColor`].getRed() / 255,
          settings[`${mobHighlightVal.mobType}HitboxColor`].getGreen() / 255,
          settings[`${mobHighlightVal.mobType}HitboxColor`].getBlue() / 255,
          1,
          false
        )
        num++
      }
    })
    mobsHighlighted[mobHighlightKey] = num
    
    if (settings.mobEspCount) {
      mobCountOverlay.message = "";
      Object.entries(mobsHighlighted).forEach(([mobsHighlightedKey, mobsHighlightedNum]) => {
        mobCountOverlay.message += `${ mobsHighlightedKey }: ${ mobsHighlightedNum }\n`
      })
    }
  })
  if (!settings.rawMobList) {
    mobCountOverlay.message = ""
  }


  if (settings.stand) {
    World.getAllEntitiesOfType(ARMOR_STANDS)
      .forEach(stand => {
        if (stand.toString().includes("name=Armor Stand") || Player.asPlayerMP().distanceTo(stand) > settings.distance) return
        settings.stand.split(",").forEach(entry => {
          if (entry.startsWith(" ")) entry = entry.replace(" ", "")
          if (stand.getName().toLowerCase().includes(entry.toLowerCase())) {
            RenderLib.drawEspBox(stand.getX(), stand.getY(), stand.getZ(), 1, 1, settings.standColor.getRed() / 255, settings.standColor.getGreen() / 255, settings.standColor.getBlue() / 255, 1, false);
          }
        })
      })
  }

  if (settings.player) {
    World.getAllEntitiesOfType(PLAYERS)
      .forEach(player => {
        if (Player.asPlayerMP().distanceTo(player) > settings.distance || player.isInvisible()) return
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
}), () => (data.mobsHighlight||settings.stand||settings.player))

let [matchoTitle, matchoEntities] = [0, 0]

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(PLAYERS).forEach(matcho => {
    if (matcho.getName() == "matcho ") {
      RenderLib.drawEspBox(matcho.getX(), matcho.getY(), matcho.getZ(), matcho.getWidth(), matcho.getHeight(), 0, 1, 0, 1, false);
      if (Player.asPlayerMP().canSeeEntity(matcho)) {
        Tessellator.drawString(`Matcho`, matcho.getX(), matcho.getY() + matcho.getHeight() + 0.5, matcho.getZ(), 0x00ff00, false);
      }
      matchoTitle += 1
    }
    else if (matcho.getName()) {
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

let [broodTitle, broodEntities] = [0, 0]
let [keeperTitle, keeperEntities] = [0, 0]
registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(ARMOR_STANDS).forEach(stand => {
    if (stand.getName().includes("Broodmother")) {
      RenderLib.drawEspBox(stand.getX(), stand.getY(), stand.getZ(), 1, 1, 0, 1, 0, 1, false);
      if (Player.asPlayerMP().canSeeEntity(stand)) {
        Tessellator.drawString(`Brood Mother`, stand.getX(), stand.getY(), stand.getZ(), 0x00ff00, false);
      }
      broodTitle += 1
    }
    else if (stand.getName()) {
      broodEntities += 1;
    }
    if (broodTitle == 1 && settings.broodmotherAlert && stand.getName().includes("Broodmother")) {
      Client.showTitle("&4Brood Mother!", "", 1, 1, 0);
    }
    else if (broodEntities >= 2000) {
      broodTitle = 0;
      broodEntities = 0;
    }
  })
}), () => getWorld() == "Spider's Den" && settings.broodmother)

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(ARMOR_STANDS).forEach(stand => {
    if (stand.getName().includes("Keeper") && stand.getY() < 95 && Player.getY() < 134) {
      RenderLib.drawEspBox(stand.getX(), stand.getY() - 0.7, stand.getZ(), 1, 1, 0, 1, 0, 1, false);
      if (Player.asPlayerMP().canSeeEntity(stand)) {
        Tessellator.drawString(`Keeper`, stand.getX(), stand.getY() + 1.5, stand.getZ(), 0x00ff00, false);
      }
      keeperTitle += 1
    }
    else if (stand.getName()) {
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
}), () => getWorld() == "Spider's Den" && settings.keeper)


register("worldUnload", () => {
  matchoTitle = 0
  broodTitle = 0
  keeperTitle = 0
  matchoEntities = 0
  broodEntities = 0
  keeperEntities = 0
});