import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";
import { comma } from "../../utils/constants";

const champExample = `&6Champion XP: &e0 (+0)`
const champOverlay = new Overlay("champ", ["Crimson Isle"], () => true, data.champL, "moveChamp", champExample)

let lastChamp = 0
// TODO (ADD): add xp or pet xp tracker

// TODO: test it not working on first load
registerWhen(register("entityDeath", (entity) => {
  // entity hp % 5_000_000 == 0
  if (entity.getClassName() != "EntityBlaze" || Player.asPlayerMP()?.distanceTo(entity) > 10) return
  const champion = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
  if (!champion) return;
  const gainedChamp = champion - lastChamp
  lastChamp = champion;
  if (!gainedChamp) return
  champOverlay.message = `&6Champion XP: &e${ comma(champion.toFixed(0)) } (${ gainedChamp > 0 ? "+" : ""}${ comma(gainedChamp.toFixed(1)) })`
}), () => getWorld() == "Crimson Isle" && settings.champ);