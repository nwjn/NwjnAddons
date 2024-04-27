import RenderLib from "../../../RenderLib";
import settings from "../../config"
import { registerWhen, getRGB1 } from "../../utils/functions";
import RenderLib from "../../../RenderLib";

registerWhen(register('drawBlockHighlight', (pos, event) => {
  cancel(event)
  if (!(Player.lookingAt() instanceof Block)) return;

  RenderLib.drawEspBox(pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5, 1, 1, ...getRGB1(settings.highlightColor), 1, false)
}).setPriority(Priority.LOWEST), () => settings.highlight)