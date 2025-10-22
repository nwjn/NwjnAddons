import Ticks from "./Ticks"
import Event from "../Events/Event"

const tasks = new Map()

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

// Using event wrapper for tick also prevents worldLoad from double registering by BungeeCord
register("worldLoad", clientTick.register.bind(clientTick))

new Event("ServerTick", () => {
    // This should run on main thread to hopefully prevent conc err
    Client.scheduleTask(() => {
        if (clientTick.isRegistered) {
            clientTick.unregister()
            
            // Align triggers
            if (Date.now() - triggerOffset < 50) return
        }

        clientTick.trigger()
    })
})

const task = (method, time, onChange) => {
    const tick = Ticks.of(time)

    tick.bumpVal = tick.value === 0 ? +1 : -1
    tick.onChange = onChange
    tick.kill = () => tasks.delete(method.toString())

    tasks.set(method.toString(), tick)
    return tick
}

export const scheduleTask = (onEnd, delay) =>
    task(onEnd, delay ?? 1, (value) => {
        if (value !== 0) return
        tasks.delete(onEnd.toString())
        onEnd(value)
    })

export const addCountdown = (onTick, lifespan) =>
    task(onTick, lifespan ?? 1, (value) => {
        onTick(value)

        if (value === 0) tasks.delete(onTick.toString())
    })

export const addTimer = (onTick, start) =>
    task(onTick, start ?? 0, onTick)