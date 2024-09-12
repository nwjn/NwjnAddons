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
    let i = registers.length
    while (i--) {
      let trigger = registers[i]
      if (trigger[1]() && !trigger[2]) {
        trigger[0].register();
        trigger[2] = true;
      } else if (!trigger[1]() && trigger[2]) {
        trigger[0].unregister();
        trigger[2] = false;
      }
    }
}
//

export function getOldRGB(setting) {
    return [setting.getRed() / 255, setting.getGreen() / 255, setting.getBlue() / 255]
}
export function getRGB(setting) {
  return setting.map(val => val / 255)
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