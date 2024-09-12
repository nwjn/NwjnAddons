import { delay } from "../../../utils/functions.js";
import { Overlay } from "../../../utils/overlay";
import { data } from "../../../utils/data/DataWriter.js";
import { clamp } from "../../../utils/functions/format.js";

import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";

const drainExample =
`&6Fero: &c0%
&6Strong: &c0%`;
const drainOverlay = new Overlay("drainDisplay", ["Kuudra"], () => true, data.manaL, "moveDrain", drainExample);

const calcPercent = (title, mana, lvl) => {
  const percent = clamp(
    mana * (lvl * 0.001),
    0, 100
  )

  const color = percent === 100 ? "&a" : "&c"

  return `${title} ${lvl}: ${color}${~~percent}%`
}

const setManaBuff = (mana, feroLvl, strongLvl) => {
  drainOverlay.setMessage(
    calcPercent("&6Fero", mana, feroLvl)
    + "\n" +
    calcPercent("&6Strong", mana, strongLvl)
  );
}

const armorEnchantLvl = (enchant) => {
  return ["Helmet", "Chestplate", "Leggings", "Boots"].reduce(
    (acum, val) => 
      acum + (Player.armor[`get${val}`]()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getCompoundTag("enchantments")?.getInteger(enchant) ?? 0),
    0,
  )
}

let totalDrain = 0
KuudraUtil.registerWhen(register("chat", (num, names) => {
  if (!names.includes(Player.getName())) return

  const [mana, fero, strong] = [parseInt(num), armorEnchantLvl("ferocious_mana"), armorEnchantLvl("strong_mana")]

  totalDrain += mana
  setManaBuff(totalDrain, fero, strong)

  delay(() => {
    totalDrain -= mana
    setManaBuff(totalDrain, fero, strong)
  }, 10000);
}).setCriteria("Party > ${*}: Drained ${num} mana for: [${names}]"), () => KuudraUtil.isPhase(4) && Settings().drainDisplay)