// import Settings from "../../Settings"
// import { data } from "../../utils/data/DataWriter.js";
// import { Overlay } from "../../utils/Overlay.js";
// import { registerWhen } from "../../utils/functions.js";

// const clockExample = `&d0:00:00`;
// const clockOverlay = new Overlay("clock", ["all"], data.clockL, "moveClock", clockExample);

// registerWhen(register("step", () => {
//   clockOverlay.setMessage(`&d${ new Date().toLocaleTimeString() }`);
// }).setDelay(1), () => Settings().clock);
import DraggableGui from "../../utils/DraggableGui"
import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";
import MathUtil from "../../core/static/MathUtil";

const editGui = new DraggableGui("Clock").setCommandName("nwjnclock");

editGui.onDraw(() => {
  Renderer.translate(editGui.getX(), editGui.getY())
  Renderer.scale(editGui.getScale())
  Renderer.drawStringWithShadow(`0:00:00`, 0, 0)
  Renderer.finishDraw()
});

let time
new Feature("clock")
  .addEvent(
    new Event(EventEnums.INTERVAL.SECONDS, () => {
      time = MathUtil.getTime()
    }, 1)
  )
  .addEvent(
    new Event("renderOverlay", () => {
      if (editGui.isOpen() || !time) return

      Renderer.translate(editGui.getX(), editGui.getY())
      Renderer.scale(editGui.getScale())
      Renderer.drawStringWithShadow(time, 0, 0)
      Renderer.finishDraw()
    })
  )