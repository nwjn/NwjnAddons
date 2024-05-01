import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { SMA } from "../../../utils/constants";
import { EntityMagmaCube, comma } from "../../../utils/constants";

function calcString(hp) {
  const scaledHP = KuudraUtil.isPhase(4) ? hp * 3.5 : hp
  const displayHP = KuudraUtil.isPhase(4) ? `${ ~~(hp * 0.012) }M&8/&a300M &c❤` : `${ comma(~~(hp)) }&8/&a100K &c❤`

  const color =
    scaledHP > 80_000 ? "&a" :
    scaledHP > 60_000 ? "&e" :
    scaledHP > 40_000 ? "&6" :
    scaledHP > 20_000 ? "&c" : 
  "&4"
  
  return ChatLib.addColor(`${ color }${ displayHP }`)
}

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Find kuudra based off max HP
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e =>
    e.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b() === 100_000
  )

  if (boss) {
    const [x, y, z] = [boss.getRenderX(), boss.getRenderY(), boss.getRenderZ()]

    // box
    RenderLib.drawEspBox(
      x, y, z,
      boss.getWidth(), boss.getHeight(),
      1, 1, 0, 0.5,
      false
    );

    // hp
    Tessellator.drawString(
      calcString(boss.getEntity().func_110143_aJ()),
      x, y + boss.getHeight(), z,
      0xffffff,
      false,
      0.5,
      false
    )
  }
}), () => KuudraUtil.inKuudra() && settings.kuudraHP)