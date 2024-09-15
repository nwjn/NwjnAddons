import Settings from "../../../utils/Settings";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { comma } from "../../../utils/functions/format";
import { tessellateStringWithDepth } from "../../../utils/functions/hotfixes";
import { getMaxHP } from "../../../utils/functions.js";
import { EntityMagmaCube } from "../../../utils/constants";
import Loc from "../../../utils/Location";

let kuudra;
KuudraUtil.registerWhen(register("step", () => {
  kuudra = World.getAllEntitiesOfType(EntityMagmaCube.class).find(it => getMaxHP(it) === 100_000);
  ChatLib.chat(kuudra?.getHeight());
  ChatLib.chat(kuudra?.getWidth());
}).setDelay(2), () => KuudraUtil.hasStarted())
    
KuudraUtil.registerWhen(register("renderWorld", () => {
  if (!kuudra) return;

  RenderLib.drawEspBox(
    kuudra.getRenderX(), kuudra.getRenderY(), kuudra.getRenderZ(),
    kuudra.getWidth(), kuudra.getHeight(),
    1, 1, 0, 1,
    false
  );

  if (Settings().inLava && kuudra.isInLava()) {
    RenderLib.drawInnerEspBox(
      kuudra.getRenderX(), kuudra.getRenderY(), kuudra.getRenderZ(),
      kuudra.getWidth(), kuudra.getHeight(),
      1, 1, 0.5, 0.5,
      false
    );
  }
}), () => KuudraUtil.inKuudra() && Settings().kuudraHitbox);

const calcString = (hp) => {
  const scaledHP = KuudraUtil.inPhase(4) && Loc.inInstance("T5") ? hp * 3.5 : hp
  const displayHP =
    KuudraUtil.inPhase(4) && Loc.inInstance("T5") ? `${ ~~(hp * 0.012) }M §c❤` :
    `${ comma(~~(hp - 25_000)) } §c✳`

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
  if (!kuudra) return;

  const display = calcString(kuudra.entity.func_110143_aJ())
  const yaw = Player.getYaw()
  const wShift = kuudra.getWidth() * 0.8
  const hShift = kuudra.getHeight() / 2

  const xShift = kuudra.getRenderX() + (wShift * Math.cos((yaw - 90) * (Math.PI / 180)))
  const yShift = kuudra.getRenderY() + hShift
  const zShift = kuudra.getRenderZ() + (wShift * Math.sin((yaw - 90) * (Math.PI / 180)))

  tessellateStringWithDepth(
    display,
    xShift,
    yShift,
    zShift,
    0.2
  )
}), () => KuudraUtil.hasStarted() && Settings().kuudraHP);