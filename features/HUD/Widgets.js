import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";

// let a = 0
function widget(find, overlay) {
  overlay.message = ""
  if (!settings[`${overlay.setting}`] || !settings.widget) return
  let tab = TabList.getNames()
  const start = tab.findIndex(e => e.includes(find))
  tab = tab.slice(start)
  const end = tab.findIndex((e, i) => ((!e.removeFormatting().startsWith(" ") && !e.match(/(ACTIVE|○|☘)/g))|| e.removeFormatting().startsWith("               ")) && i)
  tab = tab.slice(0, end)
  overlay.message = tab.join("\n")
  // if (find == "Powders:" & !a) {
  //   tab.forEach(e => ChatLib.chat(e))
  //   a++
  // }
}

const statsExample =
`&e&lStats:
 Speed: ✦0
 Strength: &c❁0
 Crit Chance: &9☣0
 Crit Damage: &9☠0
 Attack Speed: &e⚔0
 Ferocity: &c0⫽`;
const statsOverlay = new Overlay("stats", ["all"], () => true, data.statsL, "moveStats", statsExample);

const petExample =
`&e&lPet:
 &7[Lvl 200] &6Golden Dragon
 &5Antique Remedies
 &6+&e2,147,483,647 XP`;
const petOverlay = new Overlay("pet", ["all"], () => true, data.petL, "movePet", petExample);

const bestiaryExample =
`&6&lBestiary:
 &8&lAshfang 20&r: &b&lMAX
 &4&lMagma Boss 20&r: &b&lMAX`;
const bestiaryOverlay = new Overlay("bestiary", ["all"], () => true, data.bestiaryL, "moveBestiary", bestiaryExample);

const cropExample =
`&b&lCrop Milestones:
 Wheat 30: &a53.5%
 Carrot 30: &a32.3%
 Potato 32: &a39.9%
 Pumpkin 34: &a3.2%
 Sugar Cane 43: &a76.4%
 Melon 38: &a83.7%
 Cactus 31: &a55.9%
 Cocoa Beans 33: &a31.1%
 Mushroom 32: &a81.3%
 Nether Wart 32: &a93.2%`;
const cropOverlay = new Overlay("crop", ["Garden"], () => true, data.cropL, "moveCrop", cropExample);

const pestExample =
`&4&lPests:
 Alive: &42
 Infested Plots: &b11&f, &b20
 Spray: &7None
 Bonus: &c&lINACTIVE`;
const pestOverlay = new Overlay("pest", ["Garden"], () => true, data.pestL, "movePest", pestExample);

const visitorExample =
`&b&lVisitors: &f(5)
 &aDuke &fNether Wart
 &aTerry &fMelon
 &aFriendly Hiker &fMutton
 &aGuy &fBrown Mushroom
 &aJamie &fNether Wart
 Next Visitor: &c&lQueue Full!`;
const visitorOverlay = new Overlay("visitor", ["Garden"], () => true, data.visitorL, "moveVisitor", visitorExample);

const contestExample =
`&e&lJacob's Contest:
 Starts In: &e3m 36s
 &e○ &fNether Wart
 &6☘ &fPumpkin
 &e○ &fWheat`;
const contestOverlay = new Overlay("contest", ["Garden"], () => true, data.contestL, "moveContest", contestExample);

const commExample =
`&9&lCommissions:
 &fSludge Slayer: &a88%
 &fJade Crystal Hunter: &c0%
 &fHard Stone Miner: &aDONE
 &fAmethyst Crystal Hunter: &c0%`;
 // TODO: ADD NEW MINING ISLAND TO SET
const commOverlay = new Overlay("comm", ["Crystal Hollows", "Dwarven Mines"], () => true, data.commL, "moveComm", commExample);

const powderExample =
`&9&lPowders:
 Mithril Powder: &26,531,123
 Gemstone Powder: &d32,365,321`;
const powderOverlay = new Overlay("powder", ["Crystal Hollows", "Dwarven Mines"], () => true, data.powderL, "movePowder", powderExample);

const trophyExample =
`&6&lTrophy Fish:
 &8●&7●&6●&b○ &aSlugfish &7(197)
 &8●&7●&6●&b○ &9Vanille &7(330)
 &8●&7●&6●&b○ &9Obfuscated 3 &7(197)
 &8●&7●&6●&b○ &5Karate Fish &7(69)
 &8●&7●&6●&b○ &5Soul Fish &7(164)`;
const trophyOverlay = new Overlay("trophy", ["Crimson Isle"], () => true, data.trophyL, "moveTrophy", trophyExample);



const customExample = `&e&lCustom Widget:`
const customOverlay = new Overlay("custom", ["all"], () => true, data.customL, "moveCustom", customExample);

register("step", () => {
  try {
    widget("Stats:", statsOverlay);
    widget("Pet:", petOverlay);
    widget("Bestiary:", bestiaryOverlay);
    widget("Crop Milestones:", cropOverlay);
    widget("Pests:", pestOverlay);
    widget("Visitors:", visitorOverlay);
    widget("Jacob's Contest:", contestOverlay);
    widget("Commissions:", commOverlay);
    widget("Powders:", powderOverlay);
    widget("Trophy Fish:", trophyOverlay);

    widget(settings.widgetText, customOverlay);
  } catch (err) {}
}).setFps(2)