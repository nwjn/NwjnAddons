import Data from "../../data/Data"
import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import TextUtil from "../../libs/Helper/TextUtil"
import Waypoint from "../../libs/Helper/TempWaypoint"
import ConfigProperty from "../../data/ConfigProperty"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "General",
                subcategory: "Waypoints",
                configName: "ChatWaypoints",
                title: "Draw Chat Waypoints",
                description: "Creates waypoints taken from chat messages in patcher coords format"
            }),

            color: new ConfigProperty("ColorPicker", {
                category: "General",
                subcategory: "Waypoints",
                configName: "ChatWaypointsColor",
                title: "➤ Waypoint Color",
                description: "     Sets the color for waypoints",
                value: [255, 190, 239, 178],
                shouldShow: data => data.ChatWaypoints
            }),

            time: new ConfigProperty("Slider", {
                category: "General",
                subcategory: "Waypoints",
                configName: "ChatWaypointsTime",
                title: "➤ Waypoint Time",
                description: "     The amount of seconds waypoints should stay",
                options: [30, 90],
                value: 60,
                shouldShow: data => data.ChatWaypoints
            }),

            WAYPOINT_REGEX: /^(?:[\w\-]{5} > )?(?:\[\d{1,3}\] .? ?)?(?:\[\w+\+*\] )?(\w{1,16})(?: .? ?)?: x: (-?[\d\.]+), y: (-?[\d\.]+), z: (-?[\d\.]+) ?(.+)?$/,

            waypoints: new Map()
        })

        this.addEvent("ServerChat", this.onWaypointSent.bind(this), { setCriteria: this.WAYPOINT_REGEX })

        this.addSubEvent("RenderWorld", this.onRenderWorld.bind(this), () => this.waypoints.size)
    }

    /**
     * @Event ServerChat
     * @Modifier WAYPOINT_REGEX
     */
    onWaypointSent(displayName, x, y, z, text = "", { event, formatted }) {
        const ign = TextUtil.getSenderName(displayName).toLowerCase()

        if (ign in Data.blacklist) return Nwjn.append(event./* getChatComponent */func_148915_c(), "§cBlacklisted")
        
        const [mainText] = TextUtil.getMatches(/^(.+)§.:/, formatted)
        if (!mainText) return

        const waypoint = new Waypoint(ign, mainText, text, x, y, z, 5, this.time.value)
            .onDelete(this.removeWaypoint.bind(this))

        this.waypoints.set(ign, waypoint)
        this.update()
    }

    removeWaypoint(key) {
        this.waypoints.delete(key)
        this.forceUpdate()
    }

    /** @Event RenderWorld */
    onRenderWorld() {
        this.waypoints.forEach(wp => wp.render(this.color))
    }

    onDisabled() {
        this.waypoints.clear()
    }
}