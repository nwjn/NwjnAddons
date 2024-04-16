import settings from "../config";
import RenderLib from "RenderLib"
import { delay, registerWhen, getRGB1 } from "../utils/functions";
import { getWorld } from "../utils/world";
import { data } from "../utils/data";
import { Overlay } from "../utils/overlay";
import { EntityArmorStand, EntityPlayer, SMA } from "../utils/constants";

// TODO (ADD): if ~ instead of - then % the entry hp and see if r = 0
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

// TODO (FIX): CURRENTLY ARMOR STANDS DONT TAKE SPACES IN ENTRY
// TODO (ADD): Command to add mob to settings.rawmoblist
// TODO (ADD): add support for entity.boss
// TODO (CHANGE): on overlay show the health aswell so that multiple health entries of the same mobtype aren't combined
export function setMobHighlight() {
  let mobsHighlight = {}
  if (!settings.rawMobList) {
    data.mobsHighlight = mobsHighlight
    data.save()
    return
  }
  /*
     * Raw entry in form:
     * `<Mob>(-\d[kKmMbB]?(|\d[kKmMbB]?)+)?`
     *    ^   ^            ^ Delimiter between each health value
     *    |   |- Delimiter between monster & health value(s)
     *    |- A monster from net.minecraft.entity.monster or net.minecraft.entity.passive
  */
  settings.rawMobList.split(",").forEach((entryRaw) => {
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
register("guiClosed", (event) => {
  if (!event?.toString().includes("vigilance")) return
  mobCountOverlay.message = ""
  delay(() => {
    mobsHighlighted = {}
    Object.keys(data.mobsHighlight).forEach((mob) => {
      mobsHighlighted = {
        ...mobsHighlighted,
        [mob]: 0,
      }
    })
  }, 50);
  data.standList = settings.stand.split(", ")
  data.playerList = settings.player.split(", ")
  data.save()
})

const mobCountExample = `&eZombie: 0`
const mobCountOverlay = new Overlay("mobEspCount", ["all"], () => true, data.mobCountL, "moveCount", mobCountExample);
mobCountOverlay.message = ""

registerWhen(register("renderWorld", () => {
  let mobsHighlight = data.mobsHighlight;
  Object.entries(mobsHighlight).forEach(([mobHighlightKey, mobHighlightVal]) => {
    try {
      const MOB = Java.type(`net.minecraft.entity.${ mobHighlightVal.mobType }.Entity${ mobHighlightKey }`).class;
      let num = 0;
      // TODO (CHANGE): FILTER AND REMOVE FROM RENDERWORLD TRIGGER
      World.getAllEntitiesOfType(MOB).forEach(entity => {
        const ENTITY_GE = entity.getEntity();
        if (entity.isInvisible()) return;
        // todo: show on 
        let maxHP = ENTITY_GE.func_110148_a(SMA.field_111267_a).func_111125_b();
        let currentHP = ENTITY_GE.func_110143_aJ();
        if (currentHP <= 0) return;
        if (mobHighlightVal.hps.length === 0 || mobHighlightVal.hps.includes(maxHP)) {
          RenderLib.drawEspBox(
            entity.getRenderX(),
            entity.getRenderY(),
            entity.getRenderZ(),
            entity.getWidth(),
            entity.getHeight(),
            ...getRGB1(settings.espColor),
            1,
            false
          );
          num++;
        }
      });
      mobsHighlighted[mobHighlightKey] = num;
    
      // mobCountOverlay.message = mobCountOverlay.message.includes(mobHighlightKey) ? mobCountOverlay.message.replace(new RegExp(`(${ mobHighlightKey }: [0-9]+\n|&eZombie: 0)`), `${ mobHighlightKey }: ${ num }\n`) : `${ mobHighlightKey }: ${ num }\n`;
      if (mobCountOverlay.message.includes(mobHighlightKey)) {
        mobCountOverlay.message = mobCountOverlay.message.replace(new RegExp(`(${ mobHighlightKey }: [0-9]+\n|&eZombie: 0)`), `${ mobHighlightKey }: ${ num }\n`)
      }
      else {
        mobCountOverlay.message += `${ mobHighlightKey }: ${ num }\n`
      }
    } catch (error) {}
  });
}), () => data.mobsHighlight)

let filteredStands = []
registerWhen(register("step", () => {
  const STANDS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName() != "Armor Stand")
  filteredStands = []
  STANDS.forEach(stand => {
    data.standList.forEach(entry => {
      if (stand.getName().includes(entry)) filteredStands.push(stand);
    });
  })
  
  /*
  TODO (TEST & REPLACE):
  const i = STANDS.length
  const list = data.standList
  const ind = standList.length
  while (i--) { // STANDS
    while (ind--) { // data.standList
      if (STANDS[i].getName().includes(list[ind])) filteredStands.push(STANDS[i])
    }
  }

  ! if ^ doesnt work try this

  const standLength = STANDS.length
  const standList = data.standList
  const standListLength = standList.length
  for (let i = 0; i < standLength; i++) { // STANDS
    for (let ind = 0; ind < standListLength; ind++) { // data.standList
      if (STANDS[i].getName().includes(standList[ind])) filteredStands.push(STANDS[i])
    }
  }
  */
}).setFps(2), () => settings.stand)

registerWhen(register("renderWorld", () => {
  filteredStands.forEach(stand => {
    RenderLib.drawEspBox(stand.getRenderX(), stand.getRenderY(), stand.getRenderZ(), 1, 1, ...getRGB1(settings.standColor), 1, false);
  })
  /*
  TODO: TEST
  const i = filteredStands.length
  while(i--) {
    let stand = filteredStands[i]
    RenderLib.drawEspBox(stand.getRenderX(), stand.getRenderY(), stand.getRenderZ(), 1, 1, ...getRGB1(settings.standColor), 1, false);
  }

  ! if ^ doesnt work try this

  const standsLength = filteredStands.length
  for (let i = 0; i < standsLength; i++) {
    const stand = filteredStands[i]
    RenderLib.drawEspBox(stand.getRenderX(), stand.getRenderY(), stand.getRenderZ(), 1, 1, ...getRGB1(settings.standColor), 1, false);
  }
  */
}), () => settings.stand)

let filteredPlayers = []
registerWhen(register("step", () => {
  const PLAYERS = World.getAllEntitiesOfType(EntityPlayer.class).filter(e => !e.isInvisible() && ((settings.player == "Player" ? World.getPlayerByName(e.getName())?.getPing() == 1 : false) || (settings.player == "Any") || (settings.player)))
  filteredPlayers = []
  PLAYERS.forEach(player => {
    data.playerList.forEach(entry => {
      if (player.getName().includes(entry) || entry == "Player" || entry == "Any") filteredPlayers.push(player)
    })
  })
}).setFps(2), () => settings.player)

registerWhen(register("renderWorld", () => {
  filteredPlayers.forEach(player => {
    RenderLib.drawEspBox(player.getRenderX(), player.getRenderY(), player.getRenderZ(), 1, 2, ...getRGB1(settings.playerColor), 1, false)
  })
}), () => settings.player)

let filteredMatchos = []
registerWhen(register("step", () => {
  if (!settings.rawMobList) mobCountOverlay.message = ""
  const MATCHOS = World.getAllEntitiesOfType(EntityPlayer.class).filter(matcho => matcho.getName() == "matcho ")

  mobCountOverlay.message = mobCountOverlay.message.includes("Matcho") ? mobCountOverlay.message.replace(/Matcho: [0-9]+\n/g, `Matcho: ${MATCHOS.length}\n`) : mobCountOverlay.message += `Matcho: ${MATCHOS.length}\n`
  filteredMatchos = MATCHOS.filter(matcho => Player.asPlayerMP().canSeeEntity(matcho))
}).setFps(2), () => settings.matcho && getWorld() == "Crimson Isle")

registerWhen(register("renderWorld", () => {
  // MOVED MATCHO ALERT TO THE MOB COUNT OVERLAY
  filteredMatchos.forEach(matcho => {
    const x = matcho.getRenderX()
    const y = matcho.getRenderY()
    const z = matcho.getRenderZ()
    const w = matcho.getWidth()
    const h = matcho.getHeight()

    RenderLib.drawEspBox(x, y, z, w, h, 0, 1, 0, 1, false);
    Tessellator.drawString(`Matcho`, x, y + h + 0.5, z, 0x00ff00, false);
  })
}), () => getWorld() == "Crimson Isle" && settings.matcho)

let filteredKeepers = []
const CAVE_SPIDER_CLASS = Java.type("net.minecraft.entity.monster.EntityCaveSpider").class
registerWhen(register("step", () => {
  if (!settings.rawMobList) mobCountOverlay.message = ""
  const KEEPERS = World.getAllEntitiesOfType(CAVE_SPIDER_CLASS).filter(keeper => keeper.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b() % 3000 == 0)
  mobCountOverlay.message = mobCountOverlay.message.indexOf("Keeper") == -1 ? mobCountOverlay.message + `\nKeeper: ${ KEEPERS.length }\n` : mobCountOverlay.message.replace(/Keeper: [0-9]+\n/g, `Keeper: ${ KEEPERS.length }\n`)
  
  filteredKeepers = KEEPERS.filter(keeper => Player.asPlayerMP().canSeeEntity(keeper))
}).setFps(2), () => settings.keeper && getWorld() == "Spider's Den")

registerWhen(register("renderWorld", () => {
  filteredKeepers.forEach(keeper => {
    const [x, y, z] = [keeper.getRenderX(), keeper.getRenderY(), keeper.getRenderZ()]
    RenderLib.drawEspBox(x, y - 0.7, z, 1, 1, 0, 1, 0, 1, false);
    Tessellator.drawString(`Keeper`, x, y + 1.5, z, 0x00ff00, false);
  })
}), () => getWorld() == "Spider's Den" && settings.keeper);