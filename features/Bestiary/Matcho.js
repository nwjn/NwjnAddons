import settings from "../../config";
import RenderLib from "RenderLib"
import WorldUtil from "../../utils/world"
import { registerWhen } from "../../utils/functions";

let matchos = []
registerWhen(register("step", () => {
  matchos = World.getAllPlayers().filter(e =>
    e.getName() === "matcho " && Player.asPlayerMP().canSeeEntity(e)
  )
}).setDelay(1), () => WorldUtil.worldIs("Crimson Isle") && settings.matcho)

registerWhen(register("renderWorld", () => {
  let i = matchos.length
  while (i--) {
    const matcho = matchos[i]
    const [x, y, z, w, h] = [matcho.getRenderX(), matcho.getRenderY(), matcho.getRenderZ(), 0.6, 1.8]

    RenderLib.drawEspBox(x, y, z, w, h, 0, 1, 0, 1, false);
    Tessellator.drawString(`Matcho`, x, y + h + 0.5, z, 0x00ff00, false);
  }
}), () =>  WorldUtil.worldIs("Crimson Isle") && settings.matcho)