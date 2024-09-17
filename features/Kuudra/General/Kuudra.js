import Settings from "../../../utils/Settings";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { comma, radian } from "../../../utils/functions/format";
import { tessellateStringWithDepth } from "../../../utils/functions/hotfixes";
import { getMaxHP } from "../../../utils/functions.js";
import { ENTITY } from "../../../utils/Constants.js";
import Loc from "../../../utils/Location";

const MAGMA_CUBE_CLASS = ENTITY.MagmaCube.class
KuudraUtil.registerWhen(register("step", () => {
  KuudraUtil.kuudra = World.getAllEntitiesOfType(MAGMA_CUBE_CLASS).find(it => getMaxHP(it) === 100_000);
}).setDelay(2), () => KuudraUtil.hasStarted() && (Settings().kuudraHitbox || Settings().kuudraHP))
    
KuudraUtil.registerWhen(register("renderWorld", () => {
  const kuudra = KuudraUtil.kuudra
  if (!kuudra) return;

  RenderLib.drawEspBox(
    kuudra.getRenderX(), kuudra.getRenderY(), kuudra.getRenderZ(),
    15.3, 15.3,
    1, 1, 0, 1,
    false
  )
}), () => KuudraUtil.inKuudra() && Settings().kuudraHitbox);

const calcString = (hp) => {
  const scaledHP = KuudraUtil.inPhase(4) && Loc.inInstance("T5") ? hp * 3.5 : hp
  const displayHP =
    KuudraUtil.inPhase(4) && Loc.inInstance("T5") ? `${ ~~(hp * 0.012) }M §c❤` : `${ comma(~~(hp - 25_000)) } §c✳`

  const color =
    scaledHP > 83_333 ? "§2" :
    scaledHP > 66_666 ? "§a" :
    scaledHP > 50_000 ? "§e" :
    scaledHP > 33_333 ? "§6" :
    scaledHP > 16_666 ? "§c" : 
  "§4"
  
  return `${ color }${ displayHP }`
}
  
KuudraUtil.registerWhen(register("renderWorld", () => {
  const kuudra = KuudraUtil.kuudra
  if (!kuudra) return;

  const display = calcString(kuudra.entity.func_110143_aJ())
  const θrad = (Player.getYaw() - 90) * radian

  tessellateStringWithDepth(
    display,
    kuudra.getRenderX() + (12.24 * Math.cos(θrad)),
    kuudra.getRenderY() + 7.65,
    kuudra.getRenderZ() + (12.24 * Math.sin(θrad)),
    0.2
  )
}), () => KuudraUtil.hasStarted() && Settings().kuudraHP);