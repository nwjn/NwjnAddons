import Data from "../../data/Data"
import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import TextUtil from "../../libs/Helper/TextUtil"
import Waypoint from "../../libs/Render/TempWaypoint"
import ConfigProperty from "../../data/ConfigProperty"

const category = "General"
const subcategory = "Waypoints"

const setting = new ConfigProperty("Switch", {
    category,
    subcategory,
    configName: "ChatWaypoints",
    title: "Draw Chat Waypoints",
    description: "Creates waypoints taken from chat messages in patcher coords format"
})
const color = new ConfigProperty("Switch", {
    category,
    subcategory,
    configName: "ChatWaypointsColor",
    title: "➤ Waypoint Color",
    description: "     Sets the color for waypoints",
    value: [255, 190, 239, 200],
    shouldShow: data => data.ChatWaypoints
})
const time = new ConfigProperty("Slider", {
    category,
    subcategory,
    configName: "ChatWaypointsTime",
    title: "➤ Waypoint Time",
    description: "     The amount of seconds waypoints should stay",
    options: [30, 90],
    value: 120,
    shouldShow: data => data.ChatWaypoints
})

const WAYPOINT_REGEX = /^(?:[\w\-]{5} > )?(?:\[\d{1,3}\] .? ?)?(?:\[\w+\+*\] )?(\w{1,16})(?: .? ?)?: x: (-?[\d\.]+), y: (-?[\d\.]+), z: (-?[\d\.]+) ?(.+)?$/
new class extends Feature {
    constructor() {
        super({setting})

        this.waypoints = new Map()

        this.addEvent("ServerChat", this.onWaypointSent.bind(this), { setCriteria: WAYPOINT_REGEX })

        this.addSubEvent("Step", this.onIntervalPassed.bind(this), () => this.waypoints.size, { setFps: 3 })
        this.addSubEvent("RenderWorld", this.onRenderWorld.bind(this), () => this.waypoints.size)
    }

    /**
     * @Event ServerChat
     * @Modifier WAYPOINT_REGEX
     */
    onWaypointSent(displayName, x, y, z, text = "", {event, formatted}) {
        const ign = TextUtil.getSenderName(displayName).toLowerCase()

        if (ign in Data.blacklist) return Nwjn.append(event./* getChatComponent */func_148915_c(), "§cBlacklisted")
        
        const [mainText] = TextUtil.getMatches(/^(.+)§.:/, formatted)
        if (!mainText) return

        this.waypoints.set(ign, new Waypoint(mainText, text, x, y, z, color, 5, time.value))
        this.update()
    }

    /**
     * @Event Step
     * @Modifier 3 FPS
     */
    onIntervalPassed() {
        this.waypoints.forEach((waypoint, id) => {
            waypoint.update()

            if (!waypoint.dirty) return
            
            this.waypoints.delete(id)
            this.update()
        })
    }

    /**
     * @Event RenderWorld
     */
    onRenderWorld() {
        this.waypoints.forEach(waypoint => 
            waypoint.render()
        )
    }

    onDisabled() {
        this.waypoints.clear()
    }

    postInit() {
        color.update()
    }
}