import Settings from "../../../utils/Settings.js";
import RenderLib from "../../../../RenderLib/index.js"
import KuudraUtil from "../KuudraUtil.js";
import { getRGB } from "../../../utils/functions.js";
import { realPlayer } from "../../../utils/functions/player.js";

let teammates = new Set()
KuudraUtil.registerWhen(register("step", () => {
  teammates.clear()
  World.getAllPlayers().forEach(player => {
    if (!realPlayer(player)) return

    const [entity, ign] = [player, player.getName()]
    const [r, g, b, a, hex] = KuudraUtil.freshers.has(ign) ? [0, 1, 0, 1, 0x00ff00] : [...getRGB(Settings().teammateColor), 0x00ffff]

    if (!KuudraUtil.freshers.has(ign) && ign === Player.getName()) return
    teammates.add([entity, ign, r, g, b, a, hex])
  });
}).setDelay(2), () => KuudraUtil.inKuudra() && Settings().teamHighlight);

KuudraUtil.registerWhen(register("renderWorld", () => {
  teammates.forEach(it => {
    RenderLib.drawEspBox(
      it[0].getRenderX(), it[0].getRenderY(), it[0].getRenderZ(),
      0.6, 1.8,
      data[2], data[3], data[4], data[5],
      false
    );
    Tessellator.drawString(
      it[1],
      it[0].getRenderX(), it[0].getRenderY() + 2.5, it[0].getRenderZ(),
      hex,
      true
    )
  })
}), () => KuudraUtil.inKuudra() && Settings().teamHighlight);