import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";

const unrenderThese = [
  "Steady Hands",
  "Bomberman",
  "Auto Revive",
  "Elle's Lava Rod",
  "Elle's Pickaxe"
];
const regex = new RegExp(`(${ unrenderThese.join("|") })( [IV]+)?`)
const BLACK_STAINED_GLASS_PANE = new Item("minecraft:stained_glass_pane").setDamage(15).setName("").setStackSize(1).itemStack

KuudraUtil.registerWhen(register("renderSlot", (slot, _, event) => {
  if (!slot?.toString().includes("Perk Menu")) return
   
  const name = slot.getItem()?.getName()?.removeFormatting()
  
  if (name && regex.test(name)) {
    cancel(event);
    slot.mcSlot.func_75215_d(BLACK_STAINED_GLASS_PANE)
  }
}), () => KuudraUtil.inKuudra() && Settings().unrenderPerks);