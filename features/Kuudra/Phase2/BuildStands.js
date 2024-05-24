import { EntityArmorStand } from "../../../utils/constants"
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("tick", () => {
  const stands = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e =>
    e.getName()?.match(/progress/gi)
  )

  const buildingProgess = stands.find(e =>
    e.getName().includes("Building Progress")
  )
  if (buildingProgess) {
    // Entity{name=Building Progress 2% (0 Players Helping), x=-101.5, y=84.125, z=-105.5} (10)
    const name = buildingProgess.getName().removeFormatting()
  
    KuudraUtil.build = name.substring(0, name.indexOf("%")).replace(/\D/g, "")
    KuudraUtil.builders = name.substring(name.indexOf("(") + 1, name.indexOf("(") + 2)
    
    KuudraUtil.freshLeft = 10 - (Date.now() - KuudraUtil.freshTime) / 1000;
  }
  
  const buildPiles = stands.filter(e =>
    e.getName().includes("PROGRESS: ") && e.getName().includes("%")
  )
  KuudraUtil.buildPiles = buildPiles
}), () => KuudraUtil.isPhase(2))