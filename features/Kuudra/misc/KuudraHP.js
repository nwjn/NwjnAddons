import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";
import { comma } from "../../../utils/functions/format";
import { tessellateStringWithDepth } from "../../../utils/functions/hotfixes";

function calcString(hp) {
  const scaledHP = KuudraUtil.isPhase(4) ? hp * 3.5 : hp
  const displayHP =
    KuudraUtil.isPhase(4) ? `${ ~~(hp * 0.012) }M §c❤` :
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

function drawKuudraHP(text, x, y, z, w, h) {
  const yaw = Player.getYaw()
  const wShift = w * 0.8
  const hShift = h / 2

  const xShift = x + (wShift * Math.cos((yaw - 90) * (Math.PI / 180)))
  const yShift = y + hShift
  const zShift = z + (wShift * Math.sin((yaw - 90) * (Math.PI / 180)))
  
  tessellateStringWithDepth(
    text,
    xShift,
    yShift,
    zShift,
    0.2
  );
}
  
KuudraUtil.registerWhen(register("renderWorld", () => {
  const boss = KuudraUtil.getKuudra()
  if (!boss) return;

  const hpString = calcString(boss.getEntity().func_110143_aJ())
  KuudraUtil.drawKuudraHP(
    hpString,
    boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(),
    // todo: change all these vals to constants
    boss.getWidth(), boss.getHeight()
  )
}), () => KuudraUtil.isFight() && Settings().kuudraHP);