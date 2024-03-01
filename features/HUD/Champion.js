import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";
import { comma } from "../../utils/constants";

const champExample = `&6Champion XP: &e0 (+0)`
const champOverlay = new Overlay("champ", ["Crimson Isle"], () => true, data.champL, "moveChamp", champExample)

// TODO: Gained xp or pet xp
let champion2 = 0
registerWhen(register("entitydeath", (entity) => {
  const holding = Player.getHeldItem()
  if (entity.getClassName() != "EntityBlaze" || Player.asPlayerMP().distanceTo(entity) > 6 || holding == null) return
  const champion = holding.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
  const gainedChamp = champion - champion2
  champion2 = holding.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
  if (gainedChamp == 0) return
  champOverlay.message = `&6Champion XP: &e${ comma(champion.toFixed(0)) } (+${ comma(gainedChamp.toFixed(1)) })`
}), () => getWorld() == "Crimson Isle" && settings.champ);