// import EventEnums from "../../../core/EventEnums.js";
// import Feature from "../../../core/Feature.js";
// import { Event } from "../../../core/Event.js";
// import KuudraUtil from "../KuudraUtil";
// import { tessellateStringWithDepth } from "../../../utils/functions/hotfixes";
// import Loc from "../../../utils/Location";
// import { TextHelper } from "../../../utils/TextHelper.js";

// const calcHpString = (hp, y) => {
//   const check = KuudraUtil.inPhase(4) && y < 67
//   const scaledHP = check ? hp * 3.5 : hp
//   const displayHP =
//     check ? `${ ~~(hp * 0.012) }M §c❤` : `${ TextHelper.addCommas(~~(hp - 25_000)) } §c✳`

//   const color =
//     scaledHP > 83_333 ? "§2" :
//     scaledHP > 66_666 ? "§a" :
//     scaledHP > 50_000 ? "§e" :
//     scaledHP > 33_333 ? "§6" :
//     scaledHP > 16_666 ? "§c" : 
//   "§4"
  
//   return `${ color }${ displayHP }`
// }

// let kuudra
// let hpString
// let θrad
// const feat = new Feature("kuudraHP", "kuudra")
//   .addEvent(
//     new Event(EventEnums.STEP, () => {
//       kuudra = World.getAllEntitiesOfType(net.minecraft.entity.monster.EntityMagmaCube).find(it => getMaxHP(it) === 100_000);

//       feat.update()
//     }, 1)
//   )
//   .addSubEvent(
//     new Event(EventEnums.PACKET.CUSTOM.TICK, () => {
//       hpString = calcHpString(kuudra.entity.func_110143_aJ(), kuudra.getY())
//       θrad = (Player.getYaw() - 90) * TextHelper.RADIAN
//     }),
//     () => kuudra
//   )
//   .addSubEvent(
//     new Event("renderWorld", () => {
//       tessellateStringWithDepth(
//         hpString,
//         kuudra.getRenderX() + (12.24 * Math.cos(θrad)),
//         kuudra.getRenderY() + 7.65,
//         kuudra.getRenderZ() + (12.24 * Math.sin(θrad)),
//         0.2
//       )
//     }),
//     () => kuudra
//   )
//   .onUnregister(() => {
//     kuudra = undefined
//     hpString = undefined
//     θrad = undefined
//   })
// KuudraUtil.addFeat(feat)
  