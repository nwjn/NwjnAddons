import STuF from "../../core/static/STuF";
import TextUtil, { log } from "../../core/static/TextUtil";
import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";
import { scheduleTask } from "../../core/CustomRegisters";


new Feature("imageFix")
  .addEvent(
    new Event("messageSent", (msg, event) => {
      if (!/https?:\/\/.+\..+\/.+\..+/.test(msg)) return

      const [url] = TextUtil.getMatches(/(https?:\/\/.+\..+\/.+\.\w{3,4})/, msg)
      if (!url) return

      cancel(event)
      ChatLib.say(
        msg.replace(url, STuF.encode(url))
      )
    })
  )
  .addEvent(
    new Event(EventEnums.SERVER.CHAT, (url) => {
      scheduleTask(() => log(`Decoded Link: ${STuF.decode(url)}`))
    }, /(l\$[hH][1-4][0-9]*\|[\w\^\/\.\-]+)/)
  )
