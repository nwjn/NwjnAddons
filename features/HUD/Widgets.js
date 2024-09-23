import Settings from "../../utils/Settings"
import { data } from "../../utils/data/DataWriter.js";
import { Overlay } from "../../utils/Overlay.js";

function widget(find, overlay, tab) {
  overlay.setMessage("")

  if (!Settings()[`${ overlay.setting }`] || !Settings().widget) return

  const start = tab.findIndex(e => e.includes(find))
  tab = tab.slice(start)
  const end = tab.findIndex((e, i) => (!e.removeFormatting().startsWith(" ") || e.removeFormatting().startsWith("               ")) && i)
  tab = tab.slice(0, end)

  overlay.setMessage(tab.join("\n"))
}

const statsExample =
`&e&lStats:
 Speed: ✦0
 Strength: &c❁0
 Crit Chance: &9☣0
 Crit Damage: &9☠0
 Attack Speed: &e⚔0
 Ferocity: &c0⫽`;
const statsOverlay = new Overlay("stats", ["all"], data.statsL, "moveStats", statsExample);

const petExample =
`&e&lPet:
 &7[Lvl 200] &6Golden Dragon
 &5Antique Remedies
 &6+&e2,147,483,647 XP`;
const petOverlay = new Overlay("pet", ["all"], data.petL, "movePet", petExample);

const bestiaryExample =
`&6&lBestiary:
 &8&lAshfang 20&r: &b&lMAX
 &4&lMagma Boss 20&r: &b&lMAX`;
const bestiaryOverlay = new Overlay("bestiary", ["all"], data.bestiaryL, "moveBestiary", bestiaryExample);

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
const cropOverlay = new Overlay("crop", ["Garden"], data.cropL, "moveCrop", cropExample);

const visitorExample =
`&b&lVisitors: &f(5)
 &aDuke &fNether Wart
 &aTerry &fMelon
 &aFriendly Hiker &fMutton
 &aGuy &fBrown Mushroom
 &aJamie &fNether Wart
 Next Visitor: &c&lQueue Full!`;
const visitorOverlay = new Overlay("visitor", ["Garden"], data.visitorL, "moveVisitor", visitorExample);

const commExample =
`&9&lCommissions:
 &fSludge Slayer: &a88%
 &fJade Crystal Hunter: &c0%
 &fHard Stone Miner: &aDONE
 &fAmethyst Crystal Hunter: &c0%`;
const commOverlay = new Overlay("comm", ["Crystal Hollows", "Dwarven Mines", "Mineshaft"], data.commL, "moveComm", commExample);

const powderExample =
`&9&lPowders:
 Mithril Powder: &26,531,123
 Gemstone Powder: &d32,365,321`;
const powderOverlay = new Overlay("powder", ["Crystal Hollows", "Dwarven Mines", "Mineshaft"], data.powderL, "movePowder", powderExample);


const corpseExample =
`&b&lFrozen Corpses:
  &9Lapis&r: &c&lNOT LOOTED
  &9Lapis&r: &c&lNOT LOOTED
  &9Lapis&r: &c&lNOT LOOTED
  &9Lapis&r: &c&lNOT LOOTED`;
const corpseOverlay = new Overlay("corpse", ["Mineshaft"], data.corpseL, "moveCorpse", corpseExample);


const customExample = `&e&lCustom Widget:`
const customOverlay = new Overlay("custom", ["all"], data.customL, "moveCustom", customExample);

register("step", () => {
  const tab = TabList.getNames()
  if (!tab) return;
  try {
    widget("Stats:", statsOverlay, tab);
    widget("Pet:", petOverlay, tab);
    widget("Bestiary:", bestiaryOverlay, tab);
    widget("Crop Milestones:", cropOverlay, tab);
    widget("Visitors:", visitorOverlay, tab);
    widget("Commissions:", commOverlay, tab);
    widget("Powders:", powderOverlay, tab);
    widget("Frozen Corpses:", corpseOverlay, tab);

    widget(Settings().widgetText, customOverlay, tab);
  } catch (err) {
    
  }
}).setFps(2)