import EventEnums from "../../core/EventEnums";
import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import { log } from "../../core/static/TextUtil";

let lastbar = [Date.now(), ""]
new Feature("skyblockXP")
  .addEvent(
    new Event(EventEnums.SERVER.ACTIONBAR, (msg) => {
      if (Date.now() - lastbar[0] < 5000 && msg == lastbar[1]) return
      lastbar = [Date.now(), msg]
      log(msg)
    }, /.*(§b\+\d{1,3} SkyBlock XP §\w\(.+\)§b \(\d{1,2}\/100\)).*/)
)