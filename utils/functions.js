import { bestiaryDisplay, consts, statsDisplay, data, champDisplay, short_number } from "./constants"


// Credit: HJES for helpMessage and helpHelper
export function helpHelper(commandInfo) {
  lastItem = (function () {
    entries = Object.entries(commandInfo)
    return (entries[entries.length - 1][0])
  })()

  let helpMessage = "";
  for (i in commandInfo) {
    if (commandInfo[i] == "__title__") {
      let title_decorator = `&r&d&m-------------&r&d-`
      helpMessage += ChatLib.getCenteredText(`${ title_decorator }${ consts.PREFIX }${ title_decorator }`);
    } else {
      helpMessage += `&b${ i }:&f ${ commandInfo[i] }`;
    }

    if (i != lastItem) {
      helpMessage += `\n`
    }
  }

  return helpMessage
}

export function NwjnAddonsMessage(message) {
  return (`${ consts.PREFIX }&f ${message}`)
}

// Credit: Odinclient for alert
export function alert(title) {
  World.playSound("note.pling", 100, 1);
  Client.showTitle(title, "", 10, 100, 3);
}

export function openGuiMessage() {
  ChatLib.chat(ChatLib.getChatBreak("-"));
  ChatLib.chat("&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r");
  ChatLib.chat(ChatLib.getChatBreak("-"));
}

// Miniboss Timer for this function
export function guiShader() {
  if (statsDisplay.isOpen() || bestiaryDisplay.isOpen() || champDisplay.isOpen()) {
    Renderer.drawRect(
      Renderer.color(0, 0, 0, 100),
      0,
      0,
      Renderer.screen.getWidth(),
      Renderer.screen.getHeight()
    );
  }
}





