// import EventEnums from "../../../core/EventEnums.js";
// import Feature from "../../../core/Feature.js";
// import { Event } from "../../../core/Event.js";
// import RenderLib from "../../../../RenderLib"
// import KuudraUtil from "../KuudraUtil.js";

// let kuudra
// const feat = new Feature("kuudraHitbox", "kuudra")
//   .addEvent(
//     new Event(EventEnums.STEP, () => {
//       kuudra = World.getAllEntitiesOfType(net.minecraft.entity.monster.EntityMagmaCube).find(it => getMaxHP(it) === 100_000);

//       feat.update()
//     }, 1)
//   )
//   .addSubEvent(
//     new Event("renderWorld", () => {
//       RenderLib.drawEspBox(
//         kuudra.getRenderX(), kuudra.getRenderY(), kuudra.getRenderZ(),
//         15.3, 15.3,
//         1, 1, 0, 1,
//         false
//       )
//     }),
//     () => kuudra
//   )
//   .onUnregister(() => {
//     kuudra = undefined
//   })
// KuudraUtil.addFeat(feat)
  