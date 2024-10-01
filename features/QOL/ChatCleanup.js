import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";

new Feature("bossCleaner")
  .addEvent(
    new Event(EventEnums.CHAT, (event) => {
      cancel(event)
    }, "[BOSS] ${*}")
)
  
new Feature("discordCleaner")
  .addEvent(
    new Event(EventEnums.CHAT, (msg, event) => {
      cancel(event);
      ChatLib.chat(msg)
    }, "${msg}\n&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r")
)
  
new Feature("visitorCleaner", "garden")
  .addEvent(
    new Event(EventEnums.CHAT, (event) => {
      cancel(event)
    }, "[NPC] ${*}")
  )