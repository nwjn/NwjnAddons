import settings from "../../../config"
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("renderSlot", (slot, gui, event) => {
  if (!slot?.toString().includes("ContainerLocalMenu: Perk Menu")) return
  slot = slot.getItem()?.getName()?.removeFormatting()
  if (slot?.includes("Steady Hands") || slot?.includes("Bomberman") || slot == "Elle's Lava Rod" || slot == "Elle's Pickaxe" || slot == "Auto Revive" || slot?.includes("Mining Frenzy") || slot?.includes("Human Cannonball")) {
    cancel(event)
  }
}), () => KuudraUtil.inKuudra() && settings.cancelUselessPerk)