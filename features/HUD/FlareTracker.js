import settings from "../../config"
import WorldUtil from "../../utils/world"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { comma } from "../../utils/constants";

const champExample = `&6Champion XP: &e0 (+0)`
const champOverlay = new Overlay("champ", ["Crimson Isle"], () => true, data.champL, "moveChamp", champExample)

let lastChamp = 0
registerWhen(register("entityDeath", (entity) => {
  // early return checks
  if (entity.getClassName() != "EntityBlaze" || Player.asPlayerMP()?.distanceTo(entity) > 10) return
  const champion = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
  if (!champion) return;

  // xp gained on kill finder
  const gainedChamp = champion - lastChamp
  lastChamp = champion;
  if (!gainedChamp) return
  champOverlay.setMessage(`&6Champion XP: &e${ comma(champion.toFixed(0)) } (${ gainedChamp > 0 ? "+" : "" }${ comma(gainedChamp.toFixed(1)) })`)
}), () => WorldUtil.worldIs("Crimson Isle") && settings.champ);

/*
TODO (ADD): add xp/pet xp tracker
TODO (TEST): test possible error of it not working on first load
*/