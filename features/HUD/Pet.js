import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";

const petExample = `&6Pet: &r&6Golden Dragon`
// TODO: all skyblock worlds except rift
const petOverlay = new Overlay("pet", ["all"], () => true, data.petL, "movePet", petExample);

petOverlay.message = `&6Pet: &r${data.pet}`
    
register("chat", (pet) => {
  data.pet = pet
  data.save()
  petOverlay.message = `&6Pet: &r${pet}`
}).setCriteria("&cAutopet &eequipped your &7[${*}] ${pet}&e! &a&lVIEW RULE&r");

register("chat", (pet) => {
  data.pet = pet
  data.save()
  petOverlay.message = `&6Pet: &r${pet}`
}).setCriteria("&r&aYou summoned your ${pet}&r&a!&r");

register("chat", () => {
  data.pet = "&cNone"
  data.save()
  petOverlay.message = `&6Pet: &r${data.pet}`
}).setCriteria("You despawned your ${*}!");