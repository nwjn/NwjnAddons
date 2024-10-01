// import Settings from "../../Settings"
// import { data } from "../../utils/data/DataWriter.js";
// import { Overlay } from "../../utils/Overlay.js";
// import { registerWhen } from "../../utils/functions.js";

// const clockExample = `&d0:00:00`;
// const clockOverlay = new Overlay("clock", ["all"], data.clockL, "moveClock", clockExample);

// registerWhen(register("step", () => {
//   clockOverlay.setMessage(`&d${ new Date().toLocaleTimeString() }`);
// }).setDelay(1), () => Settings().clock);