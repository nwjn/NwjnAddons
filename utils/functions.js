import { consts } from "./constants";

export function fixLength(x) {
  if (x.toString().length === 2) return x;
  else return `0${x}`;
}

// Creidt: volcaddons on ct
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
delay(() => {
  setRegisters()
}, 1000);

export function holding(EA = false, type = "", string = "") {
  try {
    let item = Player.getHeldItem();
    if (!item) return
    if (EA) item = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
    if (type) item = item[`get${ type }`](string)
    return item
  } catch (err) {ChatLib.chat(`${consts.PREFIX} &4${err}`)}
}

export function getVec3Pos(vec) {
  return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

export function getVec3iPos(vec) {
  return [~~vec.field_177962_a, ~~vec.field_177960_b, ~~vec.field_177961_c]
}

export function getRGB1(setting) {
  return [setting.getRed() / 255, setting.getGreen() / 255, setting.getBlue() / 255]
}