import settings from "../../settings"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";

const clockExample = `&d0:00:00`;
const clockOverlay = new Overlay("clock", ["all"], () => true, data.clockL, "moveClock", clockExample);

registerWhen(register("step", () => {
  clockOverlay.setMessage(`&d${ new Date().toLocaleTimeString() }`);
}).setDelay(1), () => settings().clock);