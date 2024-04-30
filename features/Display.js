import settings from "../config";
import { data } from "../utils/data";
import { EntityPlayer } from "../utils/constants";
import { delay, registerWhen } from "../utils/functions";
import { Overlay } from "../utils/overlay";
import { data } from "../utils/data";
import RenderLib from "../../RenderLib";

const legionExample = `&eLegion: &cAlone :(`
const legionOverlay = new Overlay("legion", ["all"], () => true, data.legionL, "moveLegion", legionExample);

registerWhen(register("renderWorld", () => {
  const players = World.getAllEntitiesOfType(EntityPlayer.class).filter(e => Player.asPlayerMP().distanceTo(e) < 30 && World.getPlayerByName(e.getName())?.getPing() == 1).length

  const txt = players > 1 ? `&eLegion: &a${players}` : `&eLegion: &cAlone :(`
  legionOverlay.setMessage(txt)
}), () => settings.legion);

const gyroExample = `&6Gravity Storm: &a0s`
const gyroOverlay = new Overlay("gravityStorm", ["all"], () => true, data.gyroL, "moveGyro", gyroExample);

let gyroCD = 30;
let gyroUsed = 0
let gyroLeft = 0
registerWhen(register("chat", (percent) => {
  gyroCD = gyroCD * (parseInt(percent) / 100)
}).setCriteria("[Mage] Cooldown Reduction ${*}% -> ${percent}%"), () => settings.mageCD)

registerWhen(register("clicked", (x, y, button, down) => {
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
  if (holding != "GYROKINETIC_WAND" || button != 0 || down != true || gyroLeft > 0 || Client.isInGui()) return
  gyroUsed = Date.now()
}), () => settings.gravityStorm)

const manaExample = `&cFero: &a0%\n&cStrong: &a0%`
const manaOverlay = new Overlay("manaEnchant", ["all"], () => true, data.manaL, "moveMana", manaExample);

let totalDrain = 0
registerWhen(register("chat", (player, mana) => {
  if (player.includes("]")) {
    player = player.substring(player.indexOf(" ") + 1)
  }
  if (player.includes(" ")) {
    player = player.substring(0, player.indexOf(" "))
  }
  try {
    if (Player.getName() == player || Player.asPlayerMP()?.distanceTo(World?.getPlayerByName(player)?.getEntity()) > 5) return
    totalDrain = totalDrain + parseInt(mana) 
    let savedTotal = totalDrain
    delay(() => {
      if (savedTotal != totalDrain) return
      totalDrain = 0
    }, 10000);
  } catch (error) {}
}).setCriteria("Party > ${name}: Used ${mana} mana${*}"), () => settings.manaEnchant)

registerWhen(register("renderWorld", () => {
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
  if (holding != "END_STONE_SWORD") return
  World.getAllEntitiesOfType(EntityPlayer.class).forEach(player => {
    if (Player.asPlayerMP().distanceTo(player) > 5) return
      let ping = World.getPlayerByName(player.getName())?.getPing()
    if (ping != 1) return
    if (Player.asPlayerMP().canSeeEntity(player)) {
      RenderLib.drawInnerEspBox(player.getRenderX(), player.getRenderY(), player.getRenderZ(), 1, 2, 1, 0.667, 0, 0.25, true)
    }
  }) 
}), () => settings.endstone);

registerWhen(register("chat", (mana) => {
  let players = 0
  World.getAllEntitiesOfType(EntityPlayer.class).forEach(player => {
    if (Player.asPlayerMP().distanceTo(player) > 5) return
    let ping = World.getPlayerByName(player.getName())?.getPing()
    if (ping != 1) return
    players++
  }) 
  ChatLib.say(`/pc Used ${mana} mana on ${players} players!`)
}).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => settings.endstoneNoti)

// all hud steps
register("step", () => {
  let newTime = Date.now()
  if (settings.gravityStorm) {
    gyroLeft = gyroCD - (newTime - gyroUsed) / 1000

    let txt = ""
    if (gyroLeft >= 0) txt = `&6Gravity Storm: &c${gyroLeft.toFixed(1)}s`
    else txt = `&6Gravity Storm: &aOff CD`
    gyroOverlay.setMessage(txt)
  }
  if (settings.manaEnchant) {
    manaOverlay.setMessage("")
    let fero = 0.00
    let strong = 0.00
    let ferocityGain = 0.0
    let strengthGain = 0.0
    let feroColor = "&a"
    let strongColor = "&a"
    let txt = ""
    if (settings.feroMana > 0) {
      fero = (totalDrain / (10000 / (1 + (settings.feroMana * 0.05)))) * 100
      ferocityGain = fero <= 100 ? fero * 0.5 : 50
      if (ferocityGain >= 50) feroColor = "&c"
      ferocityGain = `${ feroColor }⫽${ ferocityGain.toFixed(1) }`
      txt = `&cFero: &a${fero.toFixed(2)}% | ${ferocityGain}`
    }
    if (settings.strongMana > 0) {
      strong = (totalDrain / (10000 / (1 + (settings.strongMana * 0.1)))) * 100
      strengthGain = strong <= 100 ? strong : 100
      if (strengthGain >= 100) strongColor = "&c"
      strengthGain = `${strongColor}❁${strengthGain.toFixed(1)}`
      txt += `\n&cStrong: &a${strong.toFixed(2)}% | ${strengthGain}`
    }
    manaOverlay.setMessage(txt)
  }
}).setFps(10);

register("worldUnload", () => {
  gyroCD = 30
  gyroUsed = 0
  cdLeft = 0
  cd = 0
})