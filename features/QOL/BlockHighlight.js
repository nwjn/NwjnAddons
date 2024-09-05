import RenderLib from "../../../RenderLib";
import settings from "../../settings"
import { registerWhen, getRGB } from "../../utils/functions";
import RenderLib from "../../../RenderLib";

registerWhen(register("drawBlockHighlight", (pos, event) => {
  cancel(event)
  if (!(Player.lookingAt() instanceof Block)) return;

  RenderLib.drawEspBox(pos.x + 0.5, pos.y, pos.z + 0.5, 1, 1, ...getRGB(settings().highlightColor), false)
}), () => settings().highlight)