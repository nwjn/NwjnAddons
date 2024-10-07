import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import { scheduleTask } from "../../core/CustomRegisters";
import Settings from "../../data/Settings";
import RenderUtil from "../../core/static/RenderUtil";
import PlayerUtil from "../../core/static/PlayerUtil";
import TextUtil from "../../core/static/TextUtil";
import { data } from "../../data/Data";
import { addCommand } from "../../utils/Command";

// Credit: https://github.com/DocilElm/Doc/blob/main/features/misc/ChatWaypoint.js for regex
const waypoints = new Map()
const feat = new Feature("waypoint")
  .addEvent(
    new Event(EventEnums.SERVER.CHAT, (prefix, x, y, z, text, event, msg) => {
      const ign = PlayerUtil.getPlayerName(prefix).toLowerCase()
      
      if (data.blacklist.includes(ign)) return TextUtil.append(event.func_148915_c(), "&cBlacklisted")

      const id = Date.now()
      const title = msg.substring(0, msg.indexOf(":"))
      text = text ? `\n${text}` : ""

      const wp = [title, ~~x, ~~y, ~~z, text]
      waypoints.set(id, wp)

      feat.update()

      scheduleTask(() => {
        waypoints.delete(id)
        feat.update()
      }, Settings().wpTime * 20)
    }, /^(?:[\w\-]{5})?(?: > )?(?:\[\d+\] .? ?)?(?:\[[^\]]+\] )?(\w{1,16}): x: ([\d\-\.]+), y: ([\d\-\.]+), z: ([\d\-\.]+) ?(.+)?$/)
  )
  .addSubEvent(
    new Event("renderWorld", () => {
      waypoints.forEach(([title, x, y, z, text]) => {
        const distance = ~~Player.asPlayerMP().distanceTo(x, y, z)

        RenderUtil.renderWaypoint(`${ title } §b[${ distance }m]${text}`, x, y, z, ...Settings().wpColor, true)
      })
    }),
    () => waypoints.size
  )
  .onUnregister(() => {
    waypoints.clear()
  })

addCommand("clearwaypoints", "Stops rendering current waypoints", () => feat._unregister())