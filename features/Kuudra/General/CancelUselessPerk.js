// import Feature from "../../../core/Feature";
// import { Event } from "../../../core/Event";
// import EventEnums from "../../../core/EventEnums";
// import KuudraUtil from "../KuudraUtil";

// const unrenderThese = [
//   "Steady Hands",
//   "Bomberman",
//   "Auto Revive",
//   "Elle's Lava Rod",
//   "Elle's Pickaxe"
// ];
// const regex = new RegExp(`(${ unrenderThese.join("|") })( [IV]+)?`)
// const BLACK_STAINED_GLASS_PANE = new Item("minecraft:stained_glass_pane").setDamage(15).setName("").setStackSize(1).itemStack;

// let inPerkShop = false
// const feat = new Feature("unrenderPerks", "kuudra")
//   .addEvent(
//     new Event(EventEnums.PACKET.SERVER.WINDOWOPEN, (name) => {
//       scheduleTask(() => {
//         inPerkShop = name === "Perk Menu"
//         feat.update()
//       }, 2)
//     })
//   )
//   .addEvent(
//     new Event(EventEnums.PACKET.SERVER.WINDOWCLOSE, () => {
//       inPerkShop = false
//       feat.update()
//     })
//   )
//   .addSubEvent(
//     new Event("renderSlot", (slot, _, event) => {
//       const name = slot.getItem()?.getName()?.removeFormatting()
//       if (!regex.test(name)) return

//       cancel(event);
//       slot.mcSlot.func_75215_d(BLACK_STAINED_GLASS_PANE)
//     }),
//     () => inPerkShop
//   )
//   .onUnregister(() => {
//     inPerkShop = false
//   })
// KuudraUtil.addFeat(feat)