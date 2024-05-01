import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { EntityPlayer } from "../../../utils/constants";
import { realPlayer } from "../../../utils/functions";

// TODO: use KuudraUtils.teammates and World.getPlayerByName() to find entities
KuudraUtil.registerWhen(register("renderWorld", () => {
  // Have to add check if you can actually see the player because I'm pretty sure Kuudra teammates aren't added to "the team" like dungeon teammates are (need to test tho)
  const team = World.getAllEntitiesOfType(EntityPlayer.class).filter(player =>
    realPlayer(player.getName()) && Player.asPlayerMP().canSeeEntity(player)
  )

  let i = team.length
  while (i--) {
    const teammate = team[i]

    const [x, y, z] = [teammate.getRenderX(), teammate.getRenderY(), teammate.getRenderZ()]

    RenderLib.drawEspBox(
      ...[x, y, z],
      ...[0.6, 1.8],
      ...[...getRGB1(settings.teammateColor), 1],
      false
    );
    Tessellator.drawString(
      teammate.getName(),
      ...[x, y + 2.5, z],
      0x00ffff,
      false
    )
  }
}), () => KuudraUtil.inKuudra() && settings.teamHighlight)