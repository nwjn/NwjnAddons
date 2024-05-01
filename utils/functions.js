export function fixLength(x) {
  return (x.toString().length === 2 ? x : `0${x}`)
}

// Creidt: My father, Volcaronitee

const Threading = Java.type("gg.essential.api.utils.Multithreading");
export function delay(func, time) {
  if (time) {
    Threading.schedule(() => { func() }, time, java.util.concurrent.TimeUnit.MILLISECONDS);
  } else {
    Threading.runAsync(() => { func() });
  }
}

let registers = [];
export function registerWhen(trigger, dependency) {
  registers.push([trigger.unregister(), dependency, false]);
}

export function setRegisters() {
  registers.forEach(trigger => {
    if (trigger[1]() && !trigger[2]) {
      trigger[0].register();
      trigger[2] = true;
    } else if (!trigger[1]() && trigger[2]) {
      trigger[0].unregister();
      trigger[2] = false;
    }
  });
}

export function getRGB1(setting) {
  return [setting.getRed() / 255, setting.getGreen() / 255, setting.getBlue() / 255]
}

const SMA = Java.type('net.minecraft.entity.SharedMonsterAttributes');
export function getMaxHP(entity) {
  return entity.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b()
}

export function getNowHP(entity) {
  return entity.getEntity().func_110143_aJ()
}

export function getDistance(array1, array2) {
  return Math.abs(Math.hypot(array1[0] - array2[0], array1[1] - array2[1], array1[2] - array2[2]))
}

export function extractIGN(player) {
  return player?.removeFormatting()?.split("] ")?.slice(-1)?.toString()?.replace(/[^A-Za-z0-9_]/g, "")
}

export function realPlayer(playerName) {
  const ping = World.getPlayerByName(playerName)?.getPing()

  return (ping === 1)
}


let worldJoin = []
let worldLeave = []
export function onWorldJoin(func) { worldJoin.push(func); }

export function onWorldLeave(func) { worldLeave.push(func); }

import { data } from "./data";

register("worldLoad", () => {
  let i = worldJoin.length;
  while (i--) {
    worldJoin[i]();
  }
  data.save()
})

register("worldUnload", () => {
  let i = worldLeave.length;
  while (i--) {
    worldLeave[i]()
  }
  data.save()
})

register("serverDisconnect", () => {
  let i = worldLeave.length;
  while (i--) {
    worldLeave[i]()
  }
  data.save()
})