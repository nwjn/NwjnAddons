import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";

const poisonExample =
`&c0&8x &5Twilight Arrow Poison
&c0&8x &rFlint Arrows
&c0&8x &aToxic Arrow Poison`;
const poisonOverlay = new Overlay("poison", ["all"], () => true, data.poisonL, "movePoison", poisonExample);

// const itemList = {"Twilight Arrow Poison": 0, "Flint Arrow": 0, "Toxic Arrow Poison": 0}
// TODO (ADD): 9th slot arrows left
registerWhen(register("step", () => {
  try {
    let items = {"Twilight Arrow Poison": 0, "Flint Arrow": 0, "Toxic Arrow Poison": 0}
    const inv = Player?.getInventory()?.getItems()?.filter(item => /(dyePowder|arrow)/g.test(item?.toString()))

    const invLength = inv.length
    for (let i = 0; i < invLength; i++) {
      items[inv[i].getName().removeFormatting()] += inv[i].getStackSize()
    }
    
    poisonOverlay.message = `${(items["Twilight Arrow Poison"] == 0 ? "&c" : "&d") + items["Twilight Arrow Poison"] }&8x &5Twilight Arrow Poison\n${(items["Flint Arrow"] == 0 ? "&c" : "&d") + items["Flint Arrow"] }&8x &rFlint Arrows\n${(items["Toxic Arrow Poison"] == 0 ? "&c" : "&d") + items["Toxic Arrow Poison"]}&8x &aToxic Arrow Poison`
    /*
    TODO (TEST & REPLACE):
    let i = inv.length
    while(i--) items[inv[i].getName().removeFormatting()] += inv[i].getStackSize()

    poisonOverlay.message =
    `${ (!items["Twilight Arrow Poison"] ? "&c" : "&d") + items["Twilight Arrow Poison"] }&8x &5Twilight Arrow Poison
    ${ (!items["Flint Arrow"] ? "&c" : "&d") + items["Flint Arrow"] }&8x &rFlint Arrows
    ${ (!items["Toxic Arrow Poison"] ? "&c" : "&d") + items["Toxic Arrow Poison"] }&8x &aToxic Arrow Poison`
    */
  } catch (err) {}
}).setDelay(1), () => settings.poison)