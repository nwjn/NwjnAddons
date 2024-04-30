import settings from "../../config"
import WorldUtil from "../../utils/world";
import renderBeaconBeam from "../../../BeaconBeam"
import { registerWhen } from "../../utils/functions";
import { getPhase } from "./Phase";
import { EntityArmorStand } from "../../utils/constants";
import { onWorldLeave } from "../../utils/functions";

const reference = JSON.parse(FileLib.read("NwjnAddons/features/Kuudra", "MineshaftData.json")).piles
let supplies = reference

registerWhen(register("step", () => {
  if (getPhase() != 1) return;

  const piles = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName().includes("BRING SUPPLY CHEST HERE"))

  let i = piles.length
  while (i--) {
    const x = ~~piles[i].getX()
    const z = ~~piles[i].getZ()

    const idx = supplies.findIndex(e => e.xyz == [x, 78, z]) 
    ~idx && (supplies[idx].needed = false)
  }

  const idx = supplies.findIndex(e => e.name == getMissing())
  ~idx && (supplies[idx].color = [1, 0, 0])
}).setDelay(1), () => WorldUtil.worldIs("Kuudra") && settings.supplyPiles);

registerWhen(register("renderWorld", () => {
  if (getPhase() != 1) return;

  let i = supplies.filter(e => e.needed).length
  while (i--) {
    const supply = supplies[i]
    renderBeaconBeam(...supply.xyz, ...supply.color, 0.8, true, 100);
  }
}), () => WorldUtil.worldIs("Kuudra") && settings.supplyPiles)

onWorldLeave(() => {
  supplies = reference
})