import kuudraConfig from "../KuudraConfig";
import KuudraUtil from "../KuudraUtil";

const unrenderThese = [
  "Steady Hands",
  "Bomberman",
  "Auto Revive",
  "Human Cannonball",
  "Elle's Lava Rod",
  "Elle's Pickaxe"
];
const regex = new RegExp(`(${unrenderThese.join("|")})( [IV]+)?`)

KuudraUtil.registerWhen(register("renderSlot", (slot, _, event) => {
  if (!slot?.toString().includes("Perk Menu")) return
   
  const name = slot.getItem()?.getName()?.removeFormatting()
  
  if (name && regex.test(name)) cancel(event)
}), () => KuudraUtil.inKuudra() && kuudraConfig.cancelUselessPerk);