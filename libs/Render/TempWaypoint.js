import Seconds from "../Time/Units/Seconds"
import {scheduleTask} from "../Time/ServerTime"
import { renderBeacon, renderBoxFilled, renderBoxOutline } from "../../../Apelles"
import RenderUtil from "./RenderUtil"

export default class Waypoint {
    static renderWaypoint(text, x, y, z, color) {
        renderBeacon(color.dulled, x, y, z, { centered: false, h: 100, phase: true, cull: true })

        RenderUtil.drawString(text, x, y + 3, z, color.shifted, true, 0.4, true, true, true)

        renderBoxOutline(color.packed, x, y, z, 1, 1, { centered: false, lw: 2, phase: true, smooth: true, cull: true })
        renderBoxFilled(color.dulled, x, y, z, 1, 1, { centered: false, phase: true, cull: true })
    }

    constructor(mainText, subText, x, y, z, color, removalRadius, lifespan = null) {
        this.mainText = mainText
        this.subText = subText.trim(), subText && `\n${subText}`
        this.blockPos = new BlockPos(x | 0, y | 0, z | 0)
        this.color = color
        this.removalRadius = removalRadius | 0
        this.distance = Player.asPlayerMP()?.distanceTo(this.blockPos) | 0
        this.keepAlive = true

        scheduleTask(() => this.keepAlive = false, Seconds.of(5))
        if (lifespan) scheduleTask(() => { this.dirty = true; delete this }, Seconds.of(lifespan))

        this.update()
    }

    update() {
        if (!this.keepAlive && this.distance < this.removalRadius) return this.dirty = true

        this.distance = Player.asPlayerMP().distanceTo(this.blockPos) | 0
        this.text = `${this.mainText} §b[${ this.distance }m]${this.subText}`
    }

    render(color = this.color) {
        if (this.dirty) return

        const { x, y, z } = this.blockPos
        Waypoint.renderWaypoint(this.text, x, y, z, color)
    }
}