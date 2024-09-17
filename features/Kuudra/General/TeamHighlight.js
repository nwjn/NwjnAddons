import Settings from "../../../utils/Settings.js";
import RenderLib from "../../../../RenderLib/index.js"
import KuudraUtil from "../KuudraUtil.js";
import { getRGB, delay } from "../../../utils/functions.js";
import { getPlayerName } from "../../../utils/functions/player.js";
import { ENTITY } from "../../../utils/Constants.js";

const OTHER_PLAYER_CLASS = ENTITY.Player.class

KuudraUtil.registerWhen(register("step", () => {
  const color = getRGB(Settings().teammateColor)

  World.getAllEntitiesOfType(OTHER_PLAYER_CLASS).forEach(it => {
    const name = it.getName()
    if (!KuudraUtil.party.includes(name)) return

    const [r, g, b, a, hex] = KuudraUtil.inPhase(2) && KuudraUtil.freshers.has(name) ? [0, 1, 0, 1, 0x00ff00] : [...color, 0x00ffff]

    KuudraUtil.teammates.push([it, name, r, g, b, a, hex])
  });
}).setDelay(1), () => KuudraUtil.inKuudra() && Settings().teamHighlight);

KuudraUtil.registerWhen(register("renderWorld", () => {
  KuudraUtil.teammates.forEach(([it, name, r, g, b, a, hex]) => {
    RenderLib.drawEspBox(
      it.getRenderX(), it.getRenderY(), it.getRenderZ(),
      0.6, 1.8,
      r, g, b, a,
      true
    );
    Tessellator.drawString(
      name,
      it.getRenderX(), it.getRenderY() + 2.5, it.getRenderZ(),
      hex,
      true
    )
  })
}), () => KuudraUtil.inKuudra() && Settings().teamHighlight);

KuudraUtil.registerWhen(register("chat", (player) => {
  const name = getPlayerName(player)
  if (name === Player.getName()) return

  KuudraUtil.freshers.add(name)
  delay(() => KuudraUtil.freshers.delete(name), 10000);
}).setCriteria(/^Party > (.+): FRESH/), () => KuudraUtil.inPhase(2) && Settings().teamHighlight);