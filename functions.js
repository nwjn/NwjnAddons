export function helpHelper(commandInfo) {
  lastItem = (function () {
    entries = Object.entries(commandInfo)
    return (entries[entries.length - 1][0])
  })()

  helpMessage = String()
    for (i in commandInfo) {
      if (commandInfo[i] == "__title__") {
        helpMessage += `&l&d[NwjnAddons]`
      }
      // else if (commandInfo[i] == "__subtitle__") {
      //   helpMessage += `&l&d[&5${i}&d]`
      // }
      // else if (commandInfo[i] == "__custom__") {
      //   helpMessage += `${i}`
      // }
      else {
        helpMessage += `&b${i}:&f ${commandInfo[i]}`
      }

      if (i != lastItem) {
        helpMessage += `\n`
      }
  }

  return (helpMessage)
}

export function NwjnAddonsMessage(message, category) {
  return (`&d[NwjnAddons&5${(category)}&d]&f ${message}`)
}