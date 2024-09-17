import Settings from "../../utils/Settings.js"
import RenderLib from "RenderLib"
import { registerWhen, getRGB, getMaxHP } from "../../utils/functions.js";
import { PREFIX, shortNum } from "../../utils/Constants.js";

let mobsHighlight = []
/**
 * @see https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries
 */
export function setMobHighlight() {
  mobsHighlight = []
  if (!Settings().mobList) return

  Settings().mobList.split(/,\s?/g).forEach(entry => {
    const [mob, hpParam] = entry.split("-")

    // Check if entry is valid
    if (!mob) return
    const clazz = getClassOfEntity(mob)
    if (!clazz) return

    const hps = hpParam?.split("|")?.map(hp => {
      hp = hp.toLowerCase().match(/([\d\.]+)([kmb])?/)
      return (parseFloat(hp[1]) * shortNum[hp[2]])
    })

    mobsHighlight.push([
      clazz,
      hps
    ])
  })
}

const MOB_TYPES = ["monster", "passive", "boss"];
export function getClassOfEntity(name, index = 0) {
  try {
    const clazz = Java.type(`net.minecraft.entity.${ MOB_TYPES[index] }.Entity${ name }`).class;

    // recurses if #toString() throws error
    clazz.toString()

    return clazz;
  } catch(err) {
    if (index < MOB_TYPES.length) return getClassOfEntity(name, index + 1)

    ChatLib.chat(`${PREFIX}: &cEntity class called &e'${name}'&r &cdoesn't exist. Make sure to use Mob Class Name not SkyBlock name. &3@see https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`)
    return null;
  }
}

let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  mobsHighlight.forEach(it => {
    renderThese.push(
      ...World.getAllEntitiesOfType(it[0]).filter(e => 
      !e.isInvisible() && Player.asPlayerMP().canSeeEntity(e) && !e.isDead() && (!it[1] || it[1].includes(getMaxHP(e)))
      )
    )
  })
}).setDelay(1), () => Settings().mobList)

registerWhen(register("renderWorld", () => {
  const color = getRGB(Settings().mobHighlightColor)
  renderThese.forEach(it => 
    RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getWidth(), it.getHeight(), ...color, false)
  )
}), () => Settings().mobList);