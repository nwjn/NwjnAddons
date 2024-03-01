import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";

const clockExample = `0:00:00`;
const clockOverlay = new Overlay("time", ["all"], () => true, data.clockL, "moveClock", clockExample);

registerWhen(register("step", () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();

  clockOverlay.message = settings.time == 1 ? `&d${ hours % 12}:${ fixLength(minutes) }:${ fixLength(seconds) } ${hours > 0 && hours < 12 ? "AM" : "PM"}` : `&d${ fixLength(hours) }:${ fixLength(minutes) }:${ fixLength(seconds) }`;
}).setDelay(1), () => settings.time != 0)