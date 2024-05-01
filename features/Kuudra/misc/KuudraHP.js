import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { getMaxHP, getNowHP } from "../../../utils/functions";
import { EntityMagmaCube } from "../../../utils/constants";

function calcString(hp) {
  const scaledHP = KuudraUtil.isPhase(4) ? hp + 75_000 : hp
  const displayHP = KuudraUtil.isPhase(4) ? `${ ~~(hp * 0.012) }M&8/&a300M &c❤` : `${ ~~(hp) }K&8/&a100K &c❤`

  const color =
    scaledHP > 80_000 ? "&a" :
    scaledHP > 60_000 ? "&e" :
    scaledHP > 40_000 ? "&6" :
    scaledHP > 20_000 ? "&c" : 
  "&4"
  
  return (`${color}${displayHP}`)
}

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Find kuudra based off max HP
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e =>
    getMaxHP(e) === 100_000 && Player.asPlayerMP().canSeeEntity(e)
  )

  if (boss) {
    const xyz = [boss.getRenderX(), boss.getRenderY(), boss.getRenderZ()]

    // box
    RenderLib.drawInnerEspBox(
      ...[xyz],
      ...[boss.getWidth(), boss.getHeight()],
      ...[1, 1, 0, 0.5],
      false
    );

    // hp
    Tessellator.drawString(
      calcString(getNowHP(boss)),
      ...[xyz]
    )
  }
}), () => KuudraUtil.inKuudra() && settings.kuudraHP)