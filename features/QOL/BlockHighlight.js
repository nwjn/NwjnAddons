import RenderLib from "../../../RenderLib";
import Settings from "../../utils/Settings.js"
import { registerWhen, getRGB } from "../../utils/functions.js";

registerWhen(register("drawBlockHighlight", (pos, event) => {
  cancel(event)
  if (Player.lookingAt() instanceof Block) {
    RenderLib.drawEspBox(pos.x + 0.5, pos.y, pos.z + 0.5, 1, 1, ...getRGB(Settings().highlightColor), false)
  }
}), () => Settings().highlight)