import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";
import { comma, PLAYERMP } from "../../utils/constants";

const champExample = `&6Champion XP: &e0 (+0)`
const champOverlay = new Overlay("champ", ["Crimson Isle"], () => true, data.champL, "moveChamp", champExample)

let lastChamp = 0
// TODO: add xp or pet xp tracker

registerWhen(register("entityDeath", (entity) => {
  // entity hp % 5_000_000 == 0
  try {
    if (entity.getClassName() != "EntityBlaze" || PLAYERMP.distanceTo(entity) > 10 || !Player?.getHeldItem()) return
    const champion = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
    const gainedChamp = champion - lastChamp
    lastChamp = champion;
    if (!gainedChamp) return
    champOverlay.message = `&6Champion XP: &e${ comma(champion.toFixed(0)) } (+${ comma(gainedChamp.toFixed(1)) })`
  } catch (e) {}
}), () => getWorld() == "Crimson Isle" && settings.champ);