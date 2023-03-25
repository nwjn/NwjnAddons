/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { PREFIX } from "./constants"

export function helpHelper(commandInfo) {
  lastItem = (function () {
    entries = Object.entries(commandInfo)
    return (entries[entries.length - 1][0])
  })()

  helpMessage = String()
  for (i in commandInfo) {
    if (commandInfo[i] == "__title__") {
      helpMessage += new TextComponent(ChatLib.getCenteredText(`${ PREFIX }`)).chat();
    }
    else {
      helpMessage += `&b${i}:&f ${commandInfo[i]}`
    }

    if (i != lastItem) {
      helpMessage += `\n`
    }
  }

  return (helpMessage)
}

export function NwjnAddonsMessage(message) {
  return (`${PREFIX}&f ${message}`)
}

export function alert(title, player) {
  World.playSound("note.pling", 100, 1);
  Client.showTitle(title, "", 10, 100, 10);
}