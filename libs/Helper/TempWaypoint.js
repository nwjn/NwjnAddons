import Seconds from "../Time/Seconds"
import { scheduleTask, addCountdown, addTimer } from "../Time/Scheduler"
import Apelles from "./Apelley"

export default class Waypoint {
    static renderWaypoint(text, x, y, z, color) {
        Apelles.renderBeacon(color.packed, x, y, z, { centered: false, h: 200, phase: true })

        Apelles.renderBillboardString(0xFFFFFFFF, text, x, y, z, { scale: 2, increase: true, phase: true })

        Apelles.renderAABBOutline(color.packed, x, y, z, x + 1, y + 1, z + 1, { lw: 2, phase: true, smooth: true })
        Apelles.renderAABBFilled(color.damped, x, y, z, x + 1, y + 1, z + 1, { phase: true })
    }

    constructor(id, mainText, subText, x, y, z, removalRadius = 0, lifespan = Infinity) {
        this.id = id
        this.mainText = mainText
        this.subText = subText?.replace(/\|\s|@\w{0,12}/g, "")?.trim()
        this.subText = this.subText ? `\n${this.subText}` : ""
        this.removalRadius = 0

        if (removalRadius) this.removal = scheduleTask(() => this.removalRadius = removalRadius, Seconds.of(4))
        if (lifespan != Infinity) this.lifespan = scheduleTask(() => this._delete(), Seconds.of(lifespan))
        this.ticking = addCountdown(() => this.update(), Seconds.of(lifespan))
        
        this.setPos(x, y, z)
    }

    setPos(x, y, z) {
        this.x = x | 0
        this.y = y | 0
        this.z = z | 0

        this.blockPos = new BlockPos(this.x, this.y, this.z)
        this.update()
    }

    update() {
        if (this.dist < this.removalRadius) return this._delete()

        this.dist = Player.asPlayerMP().distanceTo(this.blockPos)

        this.text = `${this.mainText} §b[${ ~~this.dist }m]${this.subText}`
    }

    onDelete(fn) {
        this.deleteListener = fn

        return this
    }

    render(colorObj) {
        Waypoint.renderWaypoint(this.text, this.blockPos.x, this.blockPos.y, this.blockPos.z, colorObj)
    }

    _delete() {
        Client.scheduleTask(() => {
            this.removal?.kill()
            this.lifespan?.kill()
            this.ticking?.kill()

            this.deleteListener?.()
        })
    }
}