/** 
 * Adaptation based upon:
 * @author DocilElm
 * @license {GNU-GPL-3} https://github.com/DocilElm/Doc/blob/main/LICENSE
 * @credit https://github.com/DocilElm/Doc/blob/main/core/Feature.js
 */

import { initSettings } from "../../data/Settings"
import Location from "../Hypixel/Location"
import Event from "../Events/Event"
import ConfigProperty from "../../data/ConfigProperty"

const feets = []

export default class Feature {
    static initFeatures() {
        new Thread(() => {
            initSettings()
    
            for (let initFeat of feets) initFeat._postInit()

            new Event("WorldLoad", () => {
                for (let updateFeat of feets) updateFeat._updateRegister()
            })
            Location.onWorldChange((any) => {
                if (any) 
                    for (let worldChange of feets) worldChange._updateRegister()
                else 
                    for (let unloadFeat of feets) unloadFeat._unregister()
            })
            Location.onAreaChange(() => {
                for (let zoneChange of feets) zoneChange.zones && zoneChange._updateRegister()
            })
        }).start()
    }

    /** @override Function called once settings have been initialized */ postInit() {}
    /** @override Function called when this is registered */ onRegister() {}
    /** @override Function called when this is unregistered */ onUnregister() {}
    /** @override Function called when this is enabled by setting */ onEnabled(previousValue) {}
    /** @override Function called when this is disabled by setting */ onDisabled(previousValue) {}

    /**
     * - Utility that handles registering various events and listeners to make complex, functional, and performative features
     * - Class can be used with or without requiring the settings, worlds, or zones fields depending on the intended functionality

     * @param {?object} obj
     * @param {?ConfigProperty} obj.setting If none: Feature is always active, otherwise will (un)register based on setting
     * @param {?string[]} obj.worlds If none: Feature is not world dependent, otherwise will only register in worlds listed
     * @param {?string[]} obj.zones If none: Feature is not zone dependent, otherwise will only register in zones listed
     */
    constructor(obj = {}) {
        this.setting = obj.setting
        this.worlds = obj.worlds?.map(w => w.toLowerCase())
        this.zones = obj.zones?.map(z => z.toLowerCase())

        this.hasSetting = this.setting instanceof ConfigProperty
        this.isRegistered = false

        feets.push(this)
    }

    /** Add [Events] to run when this feature is registered */
    addEvent(triggerType, methodFn, args) {
        this.events ??= []

        this.events.push(new Event(triggerType, methodFn, args, false))
    }

    /** Add [SubEvents] to run when the feature is registered and follows a custom condition */
    addSubEvent(triggerType, methodFn, args, condition = () => true) {
        this.subEvents ??= []

        this.subEvents.push([new Event(triggerType, methodFn, args, false), condition])
    }

    /** Rechecks [SubEvents] and registers them if they follow their condition */
    update() {
        if (this.subEvents) for (let subEvent of this.subEvents) subEvent[1]() ? subEvent[0].register() : subEvent[0].unregister()
    }

    /** 
     * @private
     * Registers all attached [Events] and updates [SubEvents] 
     */
    _register() {
        if (this.isRegistered) return

        if (this.events) for (let event of this.events) event.register()
        if (this.subEvents) for (let subEvent of this.subEvents) subEvent[1]() && subEvent[0].register()

        this.onRegister()
        this.isRegistered = true
    }

    /** 
     * @private
     * UnRegisters all attached [Events] and [SubEvents] 
     */
    _unregister() {
        if (!this.isRegistered) return

        if (this.events) for (let event of this.events) event.unregister()
        if (this.subEvents) for (let subEvent of this.subEvents) subEvent[0].unregister()

        this.onUnregister()
        this.isRegistered = false
    }

    /**
     * @private
     * - Updates registers based on setting, world, and zone criteria of this [Feature]
     * - Location#inWorld and Location#inZone return true if param is nullish
     */
    _updateRegister() {
        if (this.hasSetting && !this.isSettingEnabled) return this._unregister()
        if (!(Location.nwjn$inWorlds(this.worlds) && Location.nwjn$inZones(this.zones))) return this._unregister()
        
        return this._register()
    }

    /** @private */
    _postInit() {
        // Main setting enables/disables entire [Feature]
        if (this.setting) {
            this.isSettingEnabled = this.setting.value
    
            this.setting._registerListener((_, val) => {
                this.isSettingEnabled = val
                this._updateEnablers()
            })
        }

        this.postInit()

        this._updateEnablers()
    }

    /** @private */
    _updateEnablers() {
        this.isSettingEnabled ? this.onEnabled(this.isSettingEnabled) : this.onDisabled()
        this._updateRegister()
    }
}