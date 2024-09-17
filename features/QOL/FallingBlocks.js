import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";
import { ENTITY } from "../../utils/Constants.js";

const EntityJoinWorld_Class = ENTITY.JoinWorld.class;
const FallingBlock = ENTITY.FallingBlock

registerWhen(register(EntityJoinWorld_Class, (event) => {
  if (event.entity instanceof FallingBlock) cancel(event)
}), () => Settings().fallingBlocks)