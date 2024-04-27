import settings from "../../config"
import { registerWhen } from "../../utils/functions";

registerWhen(register("chat", (event) => {
  const chat = ChatLib.getChatMessage(event, true).split("&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r")[0]
  cancel(event)
  ChatLib.chat(chat)
}).setCriteria("&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r").setContains(), () => settings.discord);