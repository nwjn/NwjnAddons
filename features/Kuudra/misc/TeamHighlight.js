import Settings from "../../../utils/Settings";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import RenderUtil from "../../../utils/RenderUtil";
import PlayerUtil from "../../../utils/PlayerUtil";
import { getRGB } from "../../../utils/functions.js";

let teammates = new Set()
KuudraUtil.registerWhen(register("step", () => {
  teammates.clear()
  World.getAllPlayers().forEach(player => {
    if (!PlayerUtil.realPlayer(player)) return

    const [ign, x, y, z] = [player.getName(), player.getRenderX(), player.getRenderY(), player.getRenderZ()]
    const [r, g, b, a, hex] = KuudraUtil.freshers.has(ign) ? [0, 1, 0, 1, 0x00ff00] : [...getRGB(Settings().teammateColor), 0x00ffff]

    if (!KuudraUtil.freshers.has(ign) && ign === PlayerUtil.myIGN) return
    teammates.add([ign, x, y, z, r, g, b, a, hex])
  });
}).setFps(2), () => KuudraUtil.inKuudra() && Settings().teamHighlight);

KuudraUtil.registerWhen(register("renderWorld", () => {
  // * lf admins to add players to "team" for kuudra so this can be true esp
  teammates.forEach(data => {
    RenderLib.drawEspBox(
      data[1], data[2], data[3],
      0.6, 1.8,
      data[4], data[5], data[6], data[7],
      false
    );
    RenderUtil.drawString({
      text: data[0],
      x: data[1], y: data[2] + 2.5, z: data[3],
      color: data[8],
      increase: true
    })
  })
}), () => KuudraUtil.inKuudra() && Settings().teamHighlight);