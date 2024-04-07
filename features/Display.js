import settings from "../config";
import { data } from "../utils/data";
import { EntityPlayer, PLAYERMP, consts } from "../utils/constants";
import { delay, registerWhen, holding } from "../utils/functions";
import { Overlay } from "../utils/overlay";
import { data } from "../utils/data";
import RenderLib from "../../RenderLib";

const visitorExample = `Next Visitor: &cClaim Visitor!`
const visitorOverlay = new Overlay("nextVisitor", ["all"], () => true, data.visitorL, "moveVisitor", visitorExample);

let getTime = 0
registerWhen(register("chat", () => {
  if (settings.nextVisitor == 1) getTime = 720
  else if (settings.nextVisitor == 2) getTime = 900
}).setCriteria("${*} has arrived on your Garden!"), () => settings.nextVisitor != 0);

/*
TODO: TEST & REPLACE
let getTime = 0
registerWhen(register("chat", () => {
  getTime = settings.nextVisitor == 1 ? 720 : 900
}).setCriteria("${*} has arrived on your Garden!"), () => settings.nextVisitor);
*/

const legionExample = `&eLegion: &cAlone :(`
const legionOverlay = new Overlay("legion", ["all"], () => true, data.legionL, "moveLegion", legionExample);

registerWhen(register("renderWorld", () => {
  let legionPlayer = 1
  World.getAllEntitiesOfType(EntityPlayer.class).forEach(player => {
    if (Player.asPlayerMP().distanceTo(player) > 30) return
    let ping = World.getPlayerByName(player.getName())?.getPing()
    if (ping != 1) return
    legionPlayer++
  })
  if (legionPlayer > 20) {
    legionPlayer = 20
  }
  if (legionPlayer > 1) {
    legionOverlay.message = `&eLegion: &a${legionPlayer}`
  }
  else {
    legionOverlay.message = `&eLegion: &cAlone :(`
  }
  /*
  // TODO: TEST & REPLACE
  const players = World.getAllEntitiesOfType(EntityPlayer.class).filter(e => PLAYERMP.distanceTo(e) < 30 && World.getPlayerByName(e.getName())?.getPing() == 1).length + 1
  legionOverlay.message = players > 1 ? `&eLegion: &a${players}` : `&eLegion: &cAlone :(`
  */
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
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
  if (holding?.getString("id") != "GYROKINETIC_WAND" || button != 0 || down != true || gyroLeft > 0 || Player.getContainer() == undefined || Client.isInGui()) return
  gyroUsed = Date.now()
  /*
  TODO: TEST & REPLACE
  if (holding(true, "String", "id") != "GYROKINETIC_WAND" || button || !down || gyroLeft > 0 || !Player.getContainer() || Client.isInGui()) return
  gyroUsed = Date.now()
  */
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
  if (holding(true, "String", "id") != "END_STONE_SWORD") return
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
  if (settings.nextVisitor) {
    getTime = getTime - 0.1
    
    if (getTime > 0) {
      if (Math.trunc(getTime / 60) > 0) visitorOverlay.message = `Next Visitor: &b${ Math.trunc(getTime / 60) }m ${ Math.trunc(getTime % 60) }s`;
      else visitorOverlay.message = `Next Visitor: &b${ Math.trunc(getTime % 60) }s`;
    }

    else visitorOverlay.message = `Next Visitor: &cClaim Visitor!`;

    if (getTime.toFixed(1) == 0.1) {
      ChatLib.chat(`${ consts.PREFIX } &cClaim Your Visitor!`)
      World.playSound("note.pling", 5, 1)
    }
  }
  let newTime = Date.now()
  if (settings.gravityStorm) {
    gyroLeft = gyroCD - (newTime - gyroUsed) / 1000

    if (gyroLeft >= 0) gyroOverlay.message = `&6Gravity Storm: &c${gyroLeft.toFixed(1)}s`
    else gyroOverlay.message = `&6Gravity Storm: &aOff CD`
  }
  if (settings.manaEnchant) {
    manaOverlay.message = ""
    let fero = 0.00
    let strong = 0.00
    let ferocityGain = 0.0
    let strengthGain = 0.0
    let feroColor = "&a"
    let strongColor = "&a"
    if (settings.feroMana > 0) {
      fero = (totalDrain / (10000 / (1 + (settings.feroMana * 0.05)))) * 100
      ferocityGain = fero <= 100 ? fero * 0.5 : 50
      if (ferocityGain >= 50) feroColor = "&c"
      ferocityGain = `${ feroColor }⫽${ ferocityGain.toFixed(1) }`
      manaOverlay.message = `&cFero: &a${fero.toFixed(2)}% | ${ferocityGain}`
    }
    if (settings.strongMana > 0) {
      strong = (totalDrain / (10000 / (1 + (settings.strongMana * 0.1)))) * 100
      strengthGain = strong <= 100 ? strong : 100
      if (strengthGain >= 100) strongColor = "&c"
      strengthGain = `${strongColor}❁${strengthGain.toFixed(1)}`
      manaOverlay.message += `\n&cStrong: &a${strong.toFixed(2)}% | ${strengthGain}`
    }
  }
}).setFps(10);

register("worldUnload", () => {
  gyroCD = 30
  gyroUsed = 0
  cdLeft = 0
  cd = 0
})