import { realPlayer } from "../../../utils/functions/player";
import Settings from "../../../utils/Settings";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { EntityPlayer } from "../../../utils/constants";

KuudraUtil.registerWhen(register("renderWorld", () => {
  if (Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") != "END_STONE_SWORD") return

  World.getAllPlayers()
    .filter(e => realPlayer(e) && e.getName() != Player.getName() && Player.asPlayerMP().distanceTo(e) < 5)
    .forEach(e => 
      RenderLib.drawInnerEspBox(e.getRenderX(), e.getRenderY(), e.getRenderZ(), 1, 2, 1, 0.667, 0, 0.25, false)
    )
}), () => KuudraUtil.inPhase(4) && Settings().endstoneRange);

KuudraUtil.registerWhen(register("chat", (mana) => {
  const players = World.getWorld().func_72872_a(EntityPlayer.class, Player.asPlayerMP().getEntity().func_174813_aQ().func_72314_b(5, 5, 5)).map(e => e.func_70005_c_())

  ChatLib.say(`/pc Drained ${mana} mana for: [${players.join(", ")}]`)
}).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => KuudraUtil.inPhase(4) && Settings().partyDrain);