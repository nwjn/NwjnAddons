// import RenderLib from "../../../../RenderLib/index.js";
// import Feature from "../../../core/Feature.js";
// import { Event } from "../../../core/Event.js";
// import EventEnums from "../../../core/EventEnums.js";
// import Party from "../../../utils/Party.js";
// import { getRGB } from "../../../utils/functions.js";
// import Settings from "../../../Settings.js";
// import KuudraUtil from "../KuudraUtil.js";

// let color = getRGB(Settings().teammateColor)
// // meinConf.registerListener("teammateColor", (_, val) => color = getRGB(val))

// let team = []
// const feat = new Feature("teamHighlight", "kuudra")
//   .addEvent(
//     new Event(EventEnums.STEP, () => {
//       team = World.getAllEntitiesOfType(net.minecraft.client.entity.EntityOtherPlayerMP).filter(it => 
//         Party.getMembersArray().includes(it.getUUID().toString())
//       )
//       feat.update()
//     }, 1)
//   )
//   .addSubEvent(
//     new Event("renderWorld", () => {
//       team.forEach(it => {
//         RenderLib.drawEspBox(
//           it.getRenderX(), it.getRenderY(), it.getRenderZ(),
//           0.6, 1.8,
//           ...color,
//           true
//         );
//         Tessellator.drawString(
//           it.getName(),
//           it.getRenderX(), it.getRenderY() + 2.5, it.getRenderZ(),
//           0x00ffff,
//           true
//         )
//       })
//     }),
//     () => teammates
//   )
//   .onUnregister(() => {
//     team = []
//   })
// KuudraUtil.addFeat(feat)