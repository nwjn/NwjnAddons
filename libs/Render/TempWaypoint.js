import Seconds from "../Time/Units/Seconds"
import {scheduleTask} from "../Time/ServerTime"
import RenderUtil from "./RenderUtil"

export default class Waypoint {
    constructor(mainText, subText, x, y, z, removalRadius = null, lifespan = null) {
        this.mainText = mainText
        this.subText = subText.trim(), subText && `\n${subText}`
        this.blockPos = new BlockPos(~~x, ~~y, ~~z)
        this.removalRadius = removalRadius
        this.distance = ~~Player.asPlayerMP()?.distanceTo(this.blockPos)

        if (lifespan) scheduleTask(() => this.dirty = true, Seconds.of(lifespan))

        this.update()
    }

    update() {
        if (this.removalRadius && this.distance < this.removalRadius) return this.dirty = true

        this.distance = ~~Player.asPlayerMP().distanceTo(this.blockPos)
        this.text = `${this.mainText} §b[${ this.distance }m]${this.subText}`
    }

    render(color) {
        if (this.dirty) return

        const {x, y, z} = this.blockPos
        RenderUtil.renderWaypoint(this.text, x, y, z, color, true, true)
    }
}