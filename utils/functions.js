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

/**
 * Gets the current held item or if specified any extra information from ExtraAttributes
 * 
 * @param {String} returnType - the type to get and return
 * @param {String} tag - the tag identifiter to get
 * @returns {Item|String|Number|null}
 */
export function holding(returnType = "", tag = "") {
  let item = Player.getHeldItem();
  if (!item) return null
  if (!returnType) return item
  item = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
  if (returnType == "EA") return item
  item = item[`get${ returnType }`](tag)
  return item
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