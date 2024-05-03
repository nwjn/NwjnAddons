import settings from "../../../config"
import renderBeaconBeam from "../../../../BeaconBeam"
import { EntityArmorStand } from "../../../utils/constants"
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  const stands = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e =>
    e.getName()?.match(/progress/gi)
  )

  let i = stands.length
  while (i--) {
    const stand = stands[i]
    const name = stand.getName().removeFormatting()
    
    if (name.includes("Building Progress")) {
      const builders = name.substring(name.indexOf("(") + 1, name.indexOf("(") + 2)
      Tessellator.drawString(
        `${ builders } builders`,
        ...[stand.getRenderX(), stand.getRenderY() - 5, stand.getRenderZ()],
        ...[0x00ffff, false, 0.2, false]
      )

      const build = name.substring(0, name.indexOf("%")).replace(/\D/g, "")
      Tessellator.drawString(
        `${ build }%`,
        ...[stand.getRenderX(), stand.getRenderY() + 7, stand.getRenderZ()],
        ...[0xffffff, false, 0.5, false]
      );

      KuudraUtil.build = build

      const freshLeft = 10 - (Date.now() - KuudraUtil.freshTime) / 1000;
      if (freshLeft < 0) continue;

      Tessellator.drawString(
        `${ freshLeft.toFixed(2) }`,
        ...[stand.getRenderX(), stand.getRenderY() + 1, stand.getRenderZ()],
        ...[0x55ff55, false, 0.5, false]
      );
    }
    else if (name.includes("PROGRESS: ") && name.includes("%")) {
      renderBeaconBeam(
        ...[stand.getRenderX(), 79, stand.getRenderZ()],
        ...[1, 0, 0, 0.8],
        true,
        100
      );
    }
  }
}), () => KuudraUtil.isPhase(2) && settings.buildHelper)