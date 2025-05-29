import Seconds from "../Time/Seconds"
import { scheduleTask, addCountdown } from "../Time/Scheduler"
import Apelles from "./RenderUtil"
import { Render3D } from "../../../tska/rendering/Render3D"

export default class Waypoint {
    static renderWaypoint(text, x, y, z, color, pTicks) {
        Apelles.renderBeacon(color.packed, x, y, z, { centered: false, h: 100, phase: true, cull: true })

        Render3D.renderString(text, x + 0.5, y + 3, z + 0.5, [0, 0, 0, 64], true, 1, true, true, pTicks, true)

        Apelles.renderAABBOutline(color.packed, x, y, z, x + 1, y + 1, z + 1, { centered: false, lw: 2, phase: true, smooth: true, cull: true })
        Apelles.renderAABBFilled(color.packed, x, y, z, x + 1, y + 1, z + 1, { centered: false, phase: true, cull: true })
    }

    constructor(id, mainText, subText, x, y, z, color, removalRadius, lifespan = null) {
        this.id = id
        this.mainText = mainText
        this.subText = subText?.replace(/\| |@\w{0,12}/g, "")?.trim()
        this.subText = this.subText ? `\n${this.subText}` : ""
        this.blockPos = new Vec3i(~~x, ~~y, ~~z)
        this.color = color
        this.removalRadiusSq = removalRadius << 1
        this.distanceSq = Player.asPlayerMP().getPos().distanceSq(this.blockPos)
        this.keepAlive = true

        scheduleTask(() => this.keepAlive = false, Seconds.of(5))
        if (lifespan) scheduleTask(() => this.deleteListener?.(), Seconds.of(lifespan))

        this.update()
        addCountdown(() => this.update(), Seconds.of(lifespan))
    }

    update() {
        if (!this.keepAlive && this.distanceSq <= this.removalRadiusSq) return this.deleteListener?.()

        this.distanceSq = Player.asPlayerMP().getPos().distanceSq(this.blockPos)

        this.text = `${this.mainText} §b[${ ~~Math.sqrt(this.distanceSq) }m]${this.subText}`
    }

    render(pTicks) {
        const { x, y, z } = this.blockPos
        Waypoint.renderWaypoint(this.text, x, y, z, this.color, pTicks)
    }

    onDelete(fn) {
        this.deleteListener = fn

        return this
    }
}