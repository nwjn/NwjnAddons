import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil"
import { ENTITY } from "../../../utils/Constants";
const ARMOR_STAND_CLASS = ENTITY.ArmorStand.class

KuudraUtil.registerWhen(register("step", () => {
  KuudraUtil.build =
    World.getAllEntitiesOfType(ARMOR_STAND_CLASS)
      .find(it => /^Building Progress \d{1,3}%/.test(it.getName()?.removeFormatting()))
}).setDelay(1), () => KuudraUtil.inPhase(2) && Settings().buildPercent)
    
KuudraUtil.registerWhen(register("renderWorld", () => {
  const build = KuudraUtil.build?.getName()?.removeFormatting()?.match(/^Building Progress (\d{1,3})%/)?.[1] ?? 0
  Tessellator.drawString(
    `${ build }%`,
    -101.5, 91.125, -105.5,
    0xffffff, false, 0.5, false
  );
}), () => KuudraUtil.inPhase(2) && Settings().buildPercent)