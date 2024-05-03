import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { realPlayer } from "../../../utils/functions";
import { getRGB1 } from "../../../utils/functions";

KuudraUtil.registerWhen(register("renderWorld", () => {
  // * if admins add players to "team" for kuudra then this can be true esp, until then womp womp

  const team = World.getAllPlayers().filter(playerMP =>
    realPlayer(playerMP) && Player.asPlayerMP().canSeeEntity(playerMP)
  )

  let i = team.length
  while (i--) {
    const teammate = team[i]

    const [name, x, y, z] = [teammate.getName(), teammate.getRenderX(), teammate.getRenderY(), teammate.getRenderZ()]

    const [r, g, b, hex] = KuudraUtil.freshers.has(name) ? [0, 1, 0, 0x00ff00] : [...getRGB1(settings.teammateColor), 0x00ffff]

    if (!KuudraUtil.freshers.has(name) && name == Player.getName()) return
    
    RenderLib.drawEspBox(
      x, y, z,
      0.6, 1.8,
      r, g, b, 1,
      false
    );
    Tessellator.drawString(name, x, y + 2.5, z, hex, false)
  }
}), () => KuudraUtil.inKuudra() && settings.teamHighlight)