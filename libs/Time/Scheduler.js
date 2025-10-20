import Ticks from "./Ticks"
import Event from "../Events/Event"

const tasks = new Map()

function task(method, time, onChange) {
    const tick = Ticks.of(time)

    tick.bumpVal = tick.initialValue === 0 ? +1 : -1
    tick.onChange = onChange

    tasks.set(method.toString(), tick)
    return tick
}

export function scheduleTask(onEnd, delay) {
    return task(onEnd, delay ?? 1, (value) => {
        if (value !== 0) return
        tasks.delete(onEnd.toString())
        onEnd(value)
    })
}

export function addCountdown(onTick, lifespan) {
    return task(onTick, lifespan ?? 1, (value) => {
        onTick(value)

        if (value === 0) tasks.delete(onTick.toString())
    })
}

export function addTimer(onTick, start) {
    const timer = task(onTick, start ?? 0, onTick)
    timer.kill = () => tasks.delete(onTick.toString())

    return timer
}

/**
 * When world loads, updates will run on client ticks
 * until the server starts sending ConfirmTransaction packets.
 * Then updates will run on server ticks
 * until world is unloaded
 */
let triggerOffset = 0
const clientTick = new Event("Tick", () => {
    triggerOffset = Date.now()
    tasks.forEach(tick => tick.value += tick.bumpVal)
}, null, false)

// Using event wrapper for tick should prevent worldLoad from double registering by BungeeCord
register("worldLoad", clientTick.register.bind(clientTick))

new Event("ServerTick", () => {
    // This should run on main thread to hopefully prevent conc err
    Client.scheduleTask(() => {
        // Align triggers
        if (clientTick.isRegistered) {
            clientTick.unregister()

            if (Date.now() - d > 50) return
        }

        clientTick.trigger()
    })
})