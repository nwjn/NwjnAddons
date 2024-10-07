// Credit: DocilElm's Doc Module https://github.com/DocilElm/Doc/blob/main/shared/Command.js
import Settings from "../data/Settings"
import TextUtil from "../core/static/TextUtil"

const commands = {}

/**
 * @param {string} name
 * @param {string} description
 * @param {(...args: string) () => void} fn
 */
export const addCommand = (name, description, fn) => {
  const component = new TextComponent(`&a- ${name} &b${description}`)
    .setHover("show_text", `Click to run /nwjn ${name}`)
    .setClick("run_command", `/nwjn ${name}`)

  commands[name] = {
    description,
    chat: () => component.chat(),
    fn
  }
}
addCommand("help", "Shows this list")

register("command", (...args) => {
  if (!args?.[0]) return Settings().getConfig().openGui()

  if (args[0].toLowerCase() === "help") {
    ChatLib.chat(`${TextUtil.NWJNADDONS} &aCommand List`)
    Object.keys(commands).forEach(k => {
      commands[k].chat()
    })

    return
  }

  const cmd = commands[args[0]]
  if (!cmd) return ChatLib.chat(`${TextUtil.NWJNADDONS} &cInvalid command.`)

  cmd.fn?.(...args.slice(1))
})
  .setTabCompletions((arg) => {
      if (arg.length > 1) return []
      const allCommands = Object.keys(commands)
      if (!arg[0]) return allCommands

      const curr = allCommands.find(it => it.toLowerCase().startsWith(arg[0]?.toLowerCase()))
      if (!curr) return []

      return [curr]
  })
  .setName("nwjn", true)

import { notify } from "../core/static/TextUtil.js";
import { data } from "../data/Data.js"
const INVALID = () => notify("&cInvalid. &aAdd and remove need name entry. List and clear do not.")

// Credit: DocilElm for blacklist
addCommand("bl", "Blacklist <add, remove, list, clear> <name?>", (type, name) => {
  if (!type) return INVALID()
  if (name) name = name.toLowerCase()
  
  switch (type?.toLowerCase()) {
    case "add":
      if (!name) return INVALID()
      data.blacklist.push(name)

      notify(`&aAdded &c${name} &ato your blacklist`)
      break
      
    case "remove": {
      if (!name) return INVALID()
      data.blacklist.splice(
        data.blacklist.indexOf(name.toLowerCase()),
        1
      )

      notify(`&aRemoved &c${name} &afrom your blacklist.`)
      break
    }
      
    case "list": {
      notify("&aBlacklist:")
      data.blacklist.forEach((ign, idx) => ChatLib.chat(` ${ idx+1 }: ${ ign }`))
      break
    }  
      
    case "clear": {
      data.blacklist = []
      notify("&aCleared your blacklist.")
      break
    }
      
    default:
      return INVALID()
  }
})