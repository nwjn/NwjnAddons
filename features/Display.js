import settings from "../config";
import { data } from "../utils/data";
import { PLAYERS, comma } from "../utils/constants";
import { delay, registerWhen, fixLength } from "../utils/functions";
import { Overlay } from "../utils/overlay";
import { getWorld } from "../utils/world";
import { data } from "../utils/data";
import { consts } from "../utils/constants";
import RenderLib from "../../RenderLib";

const clockExample = `0:00:00`;
const clockOverlay = new Overlay("time", ["all"], () => true, data.clockL, "moveClock", clockExample);


const ftExample = `Fatal Tempo: 0%`;
const ftOverlay = new Overlay("ft", ["all"], () => true, data.ftL, "moveFt", ftExample);

let ftHits = [];
let time = 0
let hits = 1
const ftAddHit = (time) => {
  ftHits.push(time);
};
const ftHitsNum = () => {
  return ftHits.length * hits;
};
const ftPercent = (ftLvl) => {
  let percent = ftHitsNum() * ftLvl * 10;
  return percent <= 200 ? percent : 200;
}

registerWhen(register("actionBar", (msg) => {
  if (getWorld() == "Kuudra") {
    hits = 3
    msg = ChatLib.getChatMessage(msg, false)
    if (msg.includes("10⁑")) hits = 5
  }
  else hits = 1
}).setCriteria("⁑").setContains(), () => settings.ft)

let countdown = 0
let percent = 0

registerWhen(register("renderOverlay", () => {
  let color = "&f";
  percent = ftPercent(ftLevel);
  countdown = 3 - (countdown - time) / 1000;
  if (countdown < 0) countdown = 0;
  else if (countdown < 1 && countdown > 0) color = "&c";
  if (percent == 200) {
    let x = (Renderer.screen.getWidth() / 2 - 13 - (settings.ftTimer - 1) * 9) / settings.ftTimer
    let y = (Renderer.screen.getHeight() / 2 - 15 - (settings.ftTimer - 1) * 5.5) / settings.ftTimer
    Renderer.scale(settings.ftTimer)
    Renderer.drawString(`${ color }${ countdown.toFixed(3) }`, x, y);
  }
}), () => settings.ft);

let ftLevel = 0;
registerWhen(register("soundPlay", (pos, name) => {
  if ((getWorld() == "Kuudra" && name.toString() != "random.bow") || (getWorld() != "Kuudra" && name.toString() != "random.successful_hit")) return
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
  if (holding?.getString("id") != "TERMINATOR") return
  let ftLvl = holding.getCompoundTag("enchantments").getTag("ultimate_fatal_tempo");
  if (ftLvl) {
    time = new Date().getTime();
    ftLevel = ftLvl;
    ftAddHit(time);
  }
}), () => settings.ft);

registerWhen(register("step", () => {
  if(ftHitsNum() > 0 && new Date().getTime() - ftHits[ftHits.length - 1] >= 3000)ftHits = [];
  countdown = new Date().getTime()
}).setFps(1000), () => settings.ft);


const miniExample = `&6Last Minibosses:\n`
const miniOverlay = new Overlay("mini", ["Crimson Isle"], () => true, data.miniL, "moveMini", miniExample)

registerWhen(register("chat", (msg) => {
  // TODO: trim not replaceall, use parameters to find dead
  let chat = ChatLib.getChatMessage(msg, false)
  chat = chat.replace(" DOWN!", "")
  chat = chat.replaceAll(" ", "")
  if (chat == "BLADESOUL") data.lastMini.push("&8Bladesoul")
  else if (chat == "BARBARIANDUKEX") data.lastMini.push("&eBarbarian Duke X")
  else if (chat == "ASHFANG") data.lastMini.push("&cAshfang")
  else if (chat == "MAGMABOSS") data.lastMini.push("&4Magma Boss")
  else if (chat == "MAGEOUTLAW") data.lastMini.push("&5Mage Outlaw")
  if (data.lastMini.length > 4) data.lastMini.shift()
  data.save()
}).setCriteria(" DOWN!").setContains(), () => getWorld() == "Crimson Isle" && settings.mini);



const statsExample =
`Speed: ✦0
Strength: &c❁0
Crit Chance: &9☣0
Crit Damage: &9☠0
Attack Speed: &e⚔0`;
const statsOverlay = new Overlay("stats", ["all"], () => true, data.statsL, "moveStats", statsExample);


const visitorExample = `Next Visitor: &cClaim Visitor!`
const visitorOverlay = new Overlay("nextVisitor", ["all"], () => true, data.visitorL, "moveVisitor", visitorExample);

let getTime = 0
registerWhen(register("chat", () => {
  if (settings.nextVisitor == 1) getTime = 720
  else if (settings.nextVisitor == 2) getTime = 900
}).setCriteria("${*} has arrived on your Garden!"), () => settings.nextVisitor != 0);

const legionExample = `&eLegion: &cAlone :(`
const legionOverlay = new Overlay("legion", ["all"], () => true, data.legionL, "moveLegion", legionExample);

registerWhen(register("renderWorld", () => {
  let legionPlayer = 1
  World.getAllEntitiesOfType(PLAYERS).forEach(player => {
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
  gyroUsed = new Date().getTime()
}), () => settings.gravityStorm)

const keyGuardExample = `&cNothing Dead Yet`
const keyGuardOverlay = new Overlay("keyGuard", ["Crystal Hollows"], () => true, data.keyGuardL, "movekeyGuard", keyGuardExample);

let keyGuards = []
registerWhen(register("entityDeath", (entity) => {
  if (entity.getClassName() != "EntityZombie") return
  let maxHP = entity.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b()
  if (maxHP == "250000.0") {
    keyGuards.push(new Date().getTime())
  }
}), () => settings.keyGuard);

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
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
  if (!holding?.getString("id")?.includes("END_STONE_")) return
  World.getAllEntitiesOfType(PLAYERS).forEach(player => {
    if (Player.asPlayerMP().distanceTo(player) > 5) return
      let ping = World.getPlayerByName(player.getName())?.getPing()
    if (ping != 1) return
    if (Player.asPlayerMP().canSeeEntity(player)) {
      RenderLib.drawInnerEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, 1, 0.667, 0, 0.25, true)
    }
  }) 
}), () => settings.endstone);

registerWhen(register("chat", (mana) => {
  let players = 0
  World.getAllEntitiesOfType(PLAYERS).forEach(player => {
    if (Player.asPlayerMP().distanceTo(player) > 5) return
    let ping = World.getPlayerByName(player.getName())?.getPing()
    if (ping != 1) return
    players++
  }) 
  ChatLib.say(`/pc Used ${mana} mana on ${players} players!`)
}).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => settings.endstoneNoti)

const gardenExample = `&aPlot 8: &630m`
const gardenOverlay = new Overlay("garden", ["Garden"], () => true, data.gardenL, "moveGarden", gardenExample);
let sprays = []
let plots = []
let exchangedAt = 0
let exchangedFortune = 0

registerWhen(register("chat", (plot) => {
  sprays.push(new Date().getTime())
  plots.push(plot)
}).setCriteria("SPRAYONATOR! You sprayed Plot - ${plot} with ${*}!"), () => settings.garden)

registerWhen(register("chat", (fortune) => {
  exchangedAt = new Date().getTime()
  exchangedFortune = fortune
}).setCriteria("[NPC] Phillip: In exchange for ${*} Pests, I've given you +${fortune}☘ Farming Fortune for 30m!"), () => settings.garden)

const petExample = `&6Pet: &rGolden Dragon`
const petOverlay = new Overlay("pet", ["all"], () => true, data.petL, "movePet", petExample);

// all hud steps
register("step", () => {
  if (settings.ft) {
    if ((settings.ftOptions == 0) || (settings.ftOptions == 1 && percent != 0) || (settings.ftOptions == 2 && percent == 200)) {
      ftOverlay.message = `Fatal Tempo: ${ percent }%`;
    }
    else {
      ftOverlay.message = ""
    }
  }
  if (settings.mini) {
    let msg = data.lastMini.join("\n");
    miniOverlay.message = miniExample + msg;
  }
  if (settings.stats) {
    statsOverlay.message = "";
    if (!World.isLoaded) return
    TabList?.getNames()?.forEach(name => {
      let unformatted = ChatLib.removeFormatting(name);
      if (getWorld() != "The Rift" && getWorld() != "Garden") {
        if (unformatted.includes("Speed: ✦") && settings.speed) statsOverlay.message = name;
        if (unformatted.includes("Strength: ❁") && settings.strength) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Crit Chance: ☣") && settings.critChance) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Crit Damage: ☠") && settings.critDamage) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Attack Speed: ⚔") && settings.atkSpd) statsOverlay.message = statsOverlay.message + "\n" + name;
      }
      else if (getWorld() == "The Rift") {
        if (unformatted.includes("Rift Damage: ❁")) statsOverlay.message = name;
        if (unformatted.includes("Speed: ✦")) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Intelligence: ✎")) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Mana Regen: ⚡")) statsOverlay.message = statsOverlay.message + "\n" + name;
      }
      else if (getWorld() == "Garden") {
        if (unformatted.includes("Speed: ✦")) statsOverlay.message = ` Yaw/Pitch: ${Player.getYaw().toFixed(1)}/${Player.getPitch().toFixed(1)}\n` + name;
        if (unformatted.includes("Fortune:")) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Milestone:")) statsOverlay.message = statsOverlay.message + "\n" + name;
        if (unformatted.includes("Jacob's Contest:")) {
          name = TabList.getNames().indexOf(name) + 1
          statsOverlay.message = statsOverlay.message + `\n Contest:${TabList.getNames()[name]}`;
        }
        if (unformatted.includes(" ◆ TOP ")) statsOverlay.message += `\n${ name }`
        // ○, ◆, ☻
      }
    });
  }
}).setFps(10)
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
  let newTime = new Date().getTime()
  if (settings.gravityStorm) {
    gyroLeft = gyroCD - (newTime - gyroUsed) / 1000

    if (gyroLeft >= 0) gyroOverlay.message = `&6Gravity Storm: &c${gyroLeft.toFixed(1)}s`
    else gyroOverlay.message = `&6Gravity Storm: &aOff CD`
  }
  if (settings.keyGuard) {
    keyGuardOverlay.message = ""
    keyGuards.forEach(keyGuard => {
      keyGuard = 60 - (newTime - keyGuard) / 1000
      let keyGuard2 = keyGuard + 60
      if (keyGuard2 <= 0) {
        keyGuards.shift()
      }
      keyGuardOverlay.message = keyGuardOverlay.message + `&3Key Guard:&r ${ keyGuard.toFixed(1) }s to ${ keyGuard2.toFixed(1) }s\n`
    })
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
  if (settings.garden) {
    gardenOverlay.message = ""
    sprays.forEach(spray => {
      let index = sprays.indexOf(spray)
      let sprayLeft = 1740 - (newTime - spray) / 1000
      if (sprayLeft > 0) {
        gardenOverlay.message += `\n&aPlot ${plots[index]}: &6${(sprayLeft / 60).toFixed(0)}m`
      }
    })
    let exchangeLeft = 1740 - (newTime - exchangedAt) / 1000
    if (exchangeLeft > 0) {
      gardenOverlay.message += `\n&aExchange: &6☘${exchangedFortune} - ${(exchangeLeft / 60).toFixed(0)}m`
    }
    if (settings.pests) {
      Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line)
        if (line.includes(" ⏣ The Garde🍭n ൠ")) Client.showTitle(`&cPESTS!`, "", 0, 5, 0)
      })
    }
    if (settings.pet) {
      petOverlay.message = `&6Pet: &r${data.pet}`
    }
  }
}).setFps(10);

register("worldUnload", () => {
  gyroCD = 30
  gyroUsed = 0
  cdLeft = 0
  cd = 0
  keyGuards = []
})