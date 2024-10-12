import DraggableGui from "../../utils/DraggableGui"
import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";
import MathUtil from "../../core/static/MathUtil";

const editGui = new DraggableGui({
  name: "Clock",
  example: "0:00:00",
  setting: "clock",
  color: "clockColor",
  command: "nwjnClock"
})

new Feature("clock")
  .addEvent(
    new Event(EventEnums.INTERVAL.SECONDS, () =>
      editGui.drawText(MathUtil.getTime())
    )
  )