import { HudManager } from "../../../tska/gui/HudManager"
import Data from "../../data/Data"
import Event from "../Events/Event"
import { addCommand } from "../Helper/Command"

export default new class extends HudManager {
    constructor() {
        super(Data, false)

        this.setDrawCenterText(false)

        this.enabled = new Set()

        this.init()
    }

    /**
     * All huds are automatically drawn when the editor is open,
     * This function draws only enabled huds and will be used when editor isn't open
     */
    drawActive() {
        const huds = this.isOpen() ? this.huds : this.enabled
        huds.forEach(hud => {
            hud._triggerDraw(hud.x, hud.y)
            hud._drawOutline()
        })

        this.drawListener?.(this._selectedHud)
    }

    /**
     * Add the command to open the editor gui,
     * Create a parent RenderOverlay that renders all enabled huds
     */
    init() {
        addCommand("gui", "Opens the Editor Gui", () => this.open())

        new Event("RenderOverlay", this.drawActive.bind(this))
    }
}