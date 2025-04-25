import Event from "../Events/Event"
import Ticks from "./Units/Ticks"
import Seconds from "./Units/Seconds"

/** @returns {Ticks} */
const normalize = (val) => {
    if (val instanceof Ticks) return val
    return Ticks.of(val)
}

/** @type {Map<String, Ticks>} */
const scheduledTasks = new Map()
/**
 * @param {Function} onEnd
 * @param {Ticks|Seconds} delay
 */
export const scheduleTask = (onEnd, delay = Ticks.of(1)) => {
    const id = onEnd.toString()
    const tick = normalize(delay)

    tick.onChange = (value) => {
        if (value !== 0) return
        scheduledTasks.delete(id)
        onEnd()
    }
    
    scheduledTasks.set(id, tick)
}


/** @type {Map<String, Ticks>} */
const countdowns = new Map()

/**
 * @param {Function} onTick
 * @param {Ticks|Seconds} lifespan
 */
export const addCountdown = (onTick, lifespan) => {
    const id = onTick.toString()
    const tick = normalize(lifespan)

    tick.onChange = (value) => {
        onTick(value)

        if (value === 0) countdowns.delete(id)
    }
    
    countdowns.set(id, tick)
}


/** @type {Map<Symbol, Ticks>} */
const timers = new Map()
/**
 * @param {Function} onTick
 * @param {Ticks|Seconds} start
 */
export const addTimer = (onTick, start = Ticks.of(0)) => {
    const id = onTick.toString()
    const tick = normalize(start)

    tick.onChange = (value) => {
        onTick(value)
    }

    timers.set(id, tick)
}


const history = Array(5)
let tick = 0, lastSec = 0

export const getTPS = () => MathLib.clampFloat(history.reduce((a,b) => a+b) / 5, 0, 20).toFixed(2)

new Event("serverTick", () => {
    scheduledTasks.forEach(tick => tick.value--)
    countdowns.forEach(tick => tick.value--)
    timers.forEach(tick => tick.value++)

    if (tick++ % 20) return
    history.push(20000 / (-lastSec + (lastSec = Date.now())))
    history.shift()
})