import Ticks from "./Ticks"
import { onTick } from "../../../tska/shared/ServerTick"

/** @returns {Ticks} */
const normalize = (val) => {
    if (val instanceof Ticks) return val
    return Ticks.of(val)
}

const scheduledTasks = new Map()
const countdowns = new Map()
const timers = new Map()

export function scheduleTask(onEnd, delay = Ticks.of(1)) {
    const id = onEnd.toString()
    const tick = normalize(delay)

    tick.onChange = (value) => {
        if (value !== 0) return
        scheduledTasks.delete(id)
        onEnd(value)
    }
    
    scheduledTasks.set(id, tick)
}

export function addCountdown(onTick, lifespan) {
    const id = onTick.toString()
    const tick = normalize(lifespan)

    tick.onChange = (value) => {
        onTick(value)

        if (value === 0) countdowns.delete(id)
    }
    
    countdowns.set(id, tick)
}

export function addTimer(onTick, start = Ticks.of(0)) {
    const id = onTick.toString()
    const tick = normalize(start)

    tick.onChange = onTick

    timers.set(id, tick)
}

onTick(() => {
    scheduledTasks.forEach(tick => tick.value--)
    countdowns.forEach(tick => tick.value--)
    timers.forEach(tick => tick.value++)
})