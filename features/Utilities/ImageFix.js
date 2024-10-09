import STuF from "../../core/static/STuF";
import TextUtil from "../../core/static/TextUtil";
import Feature from "../../core/Feature";
import EventEnums from "../../core/EventEnums";
import { Event } from "../../core/Event";


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
    new Event(EventEnums.SERVER.CHAT, (url, event, msg) => {
      const decoded = STuF.decode(url)
      if (!decoded) return

      cancel(event)
      ChatLib.chat(msg.replace(url, decoded))
    }, /(l\$[hH][1-4][0-9]*\|[\w\^\/\.\-]+)/)
  )
