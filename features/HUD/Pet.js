import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";

const petExample = `&6Pet: &rGolden Dragon`
const petOverlay = new Overlay("pet", ["all"], () => true, data.petL, "movePet", petExample);
    
register("chat", (msg) => {
  let pet = ChatLib.getChatMessage(msg, true)
  data.pet = pet.substring(pet.indexOf("]") + 2, pet.indexOf("!"))
  data.save()
  petOverlay.message = `&6Pet: &r${data.pet}`
}).setCriteria("Autopet equipped your [${*}] ${*}! VIEW RULE");

register("chat", (msg) => {
  let pet = ChatLib.getChatMessage(msg, true)
  data.pet = pet.substring(pet.indexOf("r", 2) + 2, pet.indexOf("!"))
  data.save()
  petOverlay.message = `&6Pet: &r${data.pet}`
}).setCriteria("You summoned your ${*}!");

register("chat", () => {
  data.pet = "&cNone"
  data.save()
  petOverlay.message = `&6Pet: &r${data.pet}`
}).setCriteria("You despawned your ${*}!");