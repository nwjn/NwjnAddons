import kuudraConfig from "../kuudraConfig";
import KuudraUtil from "../KuudraUtil";
import { EntityMagmaCube, comma } from "../../../utils/constants";
import { getMaxHP } from "../../../utils/functions";

function calcString(hp) {
  const scaledHP = KuudraUtil.isPhase(4) ? hp * 3.5 : hp
  const displayHP =
    KuudraUtil.isPhase(4) ? `${ comma(~~(hp * 0.012)) }M &c❤` :
    `${ comma(~~(hp - 25_000)) } &c✳`

  const color =
    scaledHP > 83_333 ? "&2" :
    scaledHP > 66_666 ? "&a" :
    scaledHP > 50_000 ? "&e" :
    scaledHP > 33_333 ? "&6" :
    scaledHP > 16_666 ? "&c" : 
  "&4"
  
  return ChatLib.addColor(`${ color }${ displayHP }`)
}

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Kuudra's hp is 100k
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e =>
    getMaxHP(e) === 100_000
  )
  if (!boss) return;

  // hp
  const hpString = calcString(boss.getEntity().func_110143_aJ())
  KuudraUtil.drawKuudraHP(
    hpString,
    boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(),
    boss.getWidth(), boss.getHeight()
  )
}), () => KuudraUtil.isFight() && kuudraConfig.kuudraHP);