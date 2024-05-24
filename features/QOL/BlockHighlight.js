import RenderLib from "../../../RenderLib";
import settings from "../../config"
import { registerWhen, getRGB1 } from "../../utils/functions";
import RenderLib from "../../../RenderLib";

registerWhen(register('drawBlockHighlight', (pos, event) => {
  cancel(event)
  if (!(Player.lookingAt() instanceof Block)) return;

  RenderLib.drawEspBox(pos.x + 0.5, pos.y, pos.z + 0.5, 1, 1, ...getRGB1(settings.highlightColor), 1, false)
}), () => settings.highlight)