import settings from "../../config"
import RenderLib from "RenderLib"
import { data } from "../../utils/data";
import { registerWhen, getRGB1, getMaxHP } from "../../utils/functions";
import { PREFIX } from "../../utils/constants";

export function setMobHighlight() {
  data.mobsHighlight = {};
  if (!settings.rawMobList) return;
  /*
     * Raw entry in form:
     * `<Mob>(-\d[kKmMbB]?(|\d[kKmMbB]?)+)?`
     *    ^   ^            ^ Delimiter between each health value
     *    |   |- Delimiter between monster & health value(s)
     *    |- A monster from net.minecraft.entity.monster or net.minecraft.entity.passive
  */
  const mobList = settings.rawMobList.split(", ")
  let i = mobList.length
  while (i--) {
    const [entryMob, hpsRaw] = mobList[i].split("-")

    // Check if entry is valid
    const mob = getClassOfEntity(entryMob)
    if (!mob) return

    const hps = hpsRaw ? 
      hpsRaw?.split("|")?.map(hpRaw => {
      
      // replace character number symbols with actual numbers
      let hp = parseFloat(hpRaw.match(/[\d\.]+/g))

      if (hpRaw.match(/k/gi)) hp *= 1_000
      if (hpRaw.match(/m/gi)) hp *= 1_000_000
      if (hpRaw.match(/b/gi)) hp *= 1_000_000_000

      return hp;
    }) : false

    // add and save to the list to highlight
    data.mobsHighlight = {
      ...data.mobsHighlight,
      [mob]: hps
    }
  }
  data.save()
}

// types to test
const MOB_TYPES = ["monster", "passive", "boss", "item"];
function getClassOfEntity(entity, index = 0) {
  try {
    const packageName = `net.minecraft.entity.${ MOB_TYPES[index] }.Entity${ entity }`
    const mobClass = Java.type(packageName).class;

    // recurses if mobClass.toString() throws error
    const testClass = mobClass.toString()
    // return with underscores so it can be called later
    return packageName.replace(/\./g, "_");
  } catch(err) {
    if (index < MOB_TYPES.length) return getClassOfEntity(entity, index + 1)

    ChatLib.chat(`${PREFIX}: &cEntity called &e'${entity}' &cdoesn't exist.`)
    return false;
  }
}

registerWhen(register("renderWorld", () => {
  const entries = Object.entries(data.mobsHighlight)
  let i = entries.length
  while (i--) {
    const entityClass = entries[i][0].replace(/_/g, ".") //reformats the classname
    const hps = entries[i][1]

    // Filters out invisible, non LOS, dead, and non-includeded hps of entities
    const entities = World.getAllEntitiesOfType(Java.type(entityClass).class).filter(e => !e.isInvisible() && Player.asPlayerMP().canSeeEntity(e) && !e.isDead() && (!hps || hps.includes(getMaxHP(e))))
    let ii = entities.length
    while (ii--) {
      const entity = entities[ii];
      RenderLib.drawEspBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), entity.getWidth(), entity.getHeight(), ...getRGB1(settings.mobHighlightColor), 1, false)
    }
  }
}), () => settings.rawMobList !== "" && data.mobsHighlight !== "");