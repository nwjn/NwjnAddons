import Settings from "../../utils/Settings.js"
import { registerWhen, delay } from "../../utils/functions.js";

let rendArrows = 0;
registerWhen(register("soundPlay", () => {
  if (!["minecraft:bone", "minecraft:bow"].includes(Player.getHeldItem()?.getRegistryName())) return
  rendArrows++;
  if (rendArrows > 1) return;
  delay(() => {
    ChatLib.chat(`Rend Arrows: ${ rendArrows - 1 }`);
    rendArrows = 0;
  }, 300);
}).setCriteria("game.neutral.hurt"), () => Settings().rendArrows)