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

export function getRGB([r, g, b, a]) {
  return [r/255, g/255, b/255, a/255]
}

import { ENTITY } from "./Constants";
const SMA = ENTITY.SMA
export function getMaxHP(entity) {
  return entity.entity.func_110148_a(SMA.field_111267_a).func_111125_b()
}

export function getNowHP(entity) {
  return entity.entity.func_110143_aJ()
}