import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { EntityArmorStand } from "../../utils/constants";
import { getWorld } from "../../utils/world";

function renderWaypoint(text, coords, hex, rgb) {
  RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
  RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
  Tessellator.drawString(text, ...coords, hex, true);
  renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 75);
}

let claimed = []
let corpses = []
let exit = false;
const CORPSE_TYPES = {
  "Lapis Armor Helmet": {
    name: "Lapis",
    color: [0.33, 0.33, 1]
  },
  "Mineral Helmet": {
    name: "Tungsten",
    color: [0.66, 0.66, 0.66]
  },
  "Yog Helmet": {
    name: "Umber",
    color: [1, 0.66, 0]
  },
  "Vanguard Helmet": {
    name: "Vanguard",
    color: [0.33, 1, 1]
  }
}

registerWhen(register("step", () => {
  const stands = World.getAllEntitiesOfType(EntityArmorStand.class)
  const entities = stands.filter(a => a?.getEntity()?.func_71124_b(4)); 

  const find = stands.find(a => a?.getName() == "Exit the Glacite Mineshaft");
  if (find) exit = [(~~find.getX()) - 0.5, ~~find.getY(), (~~find.getZ()) - 0.5]

  let i = entities.length; while (i--) {
    const entity = entities[i];
    const pos = entity.getPos();
    
    if (corpses.some(e => e == pos) || claimed.some(e => pos.distance(e) < 7)) continue; // if corpse is already rendered or claimed, skip finding its coords

    const helm = entity.getEntity()?.func_71124_b(4)?.func_82833_r()?.removeFormatting();
    if (!(helm in CORPSE_TYPES)) continue;

    const [text, rgb] = [CORPSE_TYPES[helm].name, CORPSE_TYPES[helm].color]
    corpses.push(
      {
        "loc": [~~entity.getX(), ~~entity.getY(), ~~entity.getZ()],
        "vec": pos,
        "text": text,
        "rgb": rgb
      }
    );
  }
}).setDelay(1), () => settings.mineshaft && getWorld() === "Mineshaft")

registerWhen(register("renderWorld", () => {
  let x = corpses.length; while (x--) {
    const corpse = corpses[x];
    if (claimed.some(e => corpse.vec.distance(e) < 7) || (settings.lapis && corpse.text != "Lapis")) continue;
    renderWaypoint(corpse.text, corpse.loc, 0xff5555, corpse.rgb);
  }
  if (exit) renderWaypoint("Exit", exit, 0x55ffff, [1, 0, 0])
}), () => settings.mineshaft && getWorld() === "Mineshaft")

registerWhen(register("chat", () => {
  claimed.push(Player.asPlayerMP().getPos())
}).setCriteria("  ${*} CORPSE LOOT! "), () => settings.mineshaft && getWorld() === "Mineshaft")


import { onWorldLeave } from "../../utils/functions";
onWorldLeave(() => {
  if (!settings.mineshaft) return
  claimed.length = 0
  corpses.length = 0
  exit = false
})