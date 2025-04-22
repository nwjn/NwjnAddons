// import Feature from "../../libs/Features/Feature"
// import TextUtil from "../../libs/Helper/TextUtil"
// import Settings from "../../data/Settings"
// import Waypoint from "../../libs/Render/TempWaypoint"
// import Ticks from "../../libs/Time/Units/Ticks"
// import Data from "../../data/Data"
// import Nwjn from "../../libs/Helper/Nwjn"

// new class ChatWaypoints extends Feature {
//     constructor() {
//         super({
//             setting: this.constructor.name, 
//             color: this.constructor.name + "Color"
//         })

//         this.waypoints = new Map()

//         this.addEvent(
//             "serverChat", 
//             this.onWaypointSent.bind(this), 
//             /^(?:[\w\-]{5} > )?(?:\[\d{1,3}\] .? ?)?(?:\[\w+\+*\] )?(\w{1,16})(?: .? ?)?: x: (-?[\d\.]+), y: (-?[\d\.]+), z: (-?[\d\.]+) ?(.+)?$/
//         )
        
//         this.addSubEvent(
//             "interval", 
//             this.onIntervalPassed.bind(this),
//             Ticks.of(3), 
//             () => this.waypoints.size
//         )
        
//         this.addSubEvent(
//             "renderWorld", 
//             this.onRenderWorld.bind(this),
//             null, 
//             () => this.waypoints.size
//         )

//         this.init()
//     }

//     onWaypointSent(displayName, x, y, z, text = "", event, formatted) {
//         const ign = TextUtil.getSenderName(displayName).toLowerCase()

//         if (ign in Data.blacklist) return Nwjn.append(event./* getChatComponent */func_148915_c(), "§cBlacklisted")
        
//         const [mainText] = TextUtil.getMatches(/^(.+)§.:/, formatted)
//         if (!mainText) return

//         this.waypoints.set(ign, new Waypoint(mainText, text, x, y, z, 5, Settings.ChatWaypointsTime))
//         this.updateSubEvents()
//     }

//     onIntervalPassed() {
//         this.waypoints.forEach((waypoint, id) => {
//             waypoint.update()

//             if (!waypoint.dirty) return
            
//             this.waypoints.delete(id)
//             this.updateSubEvents()
//         })
//     }

//     onRenderWorld() {
//         this.waypoints.forEach(waypoint => 
//             waypoint.render(this.Color)
//         )
//     }

//     onDisabled() {
//         this.waypoints.clear()
//     }
// }