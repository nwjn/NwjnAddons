import settings from "../../config"
import { registerWhen, getRGB1 } from "../../utils/functions";
import RenderLib from "RenderLib"

registerWhen(register("renderWorld", () => {
  if (!["JINGLE_BELLS", "ENRAGER"].includes(Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id"))) return;

  RenderLib.drawCyl(Player.getRenderX(), Player.getRenderY(), Player.getRenderZ(), 10, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.agroColor), settings.agroOpacity, false, false);
}), () => settings.agro);