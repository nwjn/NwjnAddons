import settings from "../../settings"
import RenderLib from "RenderLib"
import { data } from "../../utils/data";
import { registerWhen, getRGB, getMaxHP } from "../../utils/functions";
import { PREFIX } from "../../utils/constants";
import { shortNum } from "../../utils/Enums";

/**
 * @see https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries
 */
export function setMobHighlight() {
  data.mobsHighlight = [];
  if (!settings().rawMobList) {
    data.save()
    return;
  }

  settings().rawMobList.split(", ").forEach(entry => {
    const [mob, param] = entry.split("-")

    // Check if entry is valid
    if (!mob) return;
    const clazz = Java.type(getClassOfEntity(mob)).class

    const hps = param?.split("|")?.map(hp => {
      hp = hp.toLowerCase().match(/([\d\.]+)([kmb])?/)
      return (parseFloat(hp[1]) * shortNum[hp[2]])
    })

    data.mobsHighlight.push([
      clazz,
      hps
    ])
  })
  data.save()
}

// types to test @Volcaronitee
const MOB_TYPES = ["monster", "passive", "boss"];
function getClassOfEntity(entity, index = 0) {
  try {
    const path = `net.minecraft.entity.${ MOB_TYPES[index] }.Entity${ entity }`
    const clazz = Java.type(path).class;

    // recurses if #toString() throws error
    clazz.toString()

    return path;
  } catch(err) {
    if (index < MOB_TYPES.length) return getClassOfEntity(entity, index + 1)

    ChatLib.chat(`${PREFIX}: &cEntity class called &e'${entity}'&r &cdoesn't exist. Make sure to use Mob Class Name not SkyBlock name. &3@see https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`)
    return false;
  }
}

let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  data.mobsHighlight.forEach(it => {
    World.getAllEntitiesOfType(Java.type(it[0]).class).forEach(e => {
      if (!e.isInvisible() && Player.asPlayerMP().canSeeEntity(e) && !e.isDead() && (!hps || hps.includes(getMaxHP(e)))) {
        renderThese.push(e)
      }
    })
  })
}).setDelay(1), () => settings().rawMobList !== "")

registerWhen(register("renderWorld", () => {
  const color = getRGB(settings().mobHighlightColor)
  renderThese.forEach(it => 
    RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getWidth(), it.getHeight(), ...color, false)
  )
}), () => settings().rawMobList !== "");