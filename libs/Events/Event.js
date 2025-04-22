/** 
 * Modified from:
 * @author DocilElm
 * @credit https://github.com/DocilElm/tska/blob/main/event/Event.js
 * @license {GNU-GPL-3} https://github.com/DocilElm/tska/blob/main/LICENSE
 */

import { getEvent } from "./EventMap"

export default class Event {
    /**
     * Register Handler for events
     * @param {string|JavaTPath["net.minecraftforge.fml.common.eventhandler.Event"]} triggerType 
     * @param {(...args) => void} method 
     * @param {?object} modifiers
     * @param {?boolean} orphan
     */
    constructor(triggerType, method, modifiers = {}, orphan = true) {
        // Register event from correct source
        this.event = getEvent(triggerType, method, modifiers)
        if (orphan) return this.event.register()

        this.isRegistered = false
    }

    /**
     * - Registers this [event]'s trigger
     * @returns this for method chaining
     */
    register() {
        if (this.isRegistered) return this

        this.event.register()
        this.isRegistered = true

        return this
    }

    /**
     * - Unregisters this [event]'s trigger
     * @returns this for method chaining
     */
    unregister() {
        if (!this.isRegistered) return this

        this.event.unregister()
        this.isRegistered = false

        return this
    }
}