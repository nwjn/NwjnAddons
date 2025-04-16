import Location from "../../tska/skyblock/Location"

Location.nwjn$inWorld = function (world) {
    if (Array.isArray(world)) return world.includes(this.area)
    if (typeof(world) === "string") return world === this.area
    return true
}

Location.nwjn$inZone = function (zone) {
    if (Array.isArray(zone)) return zone.includes(this.subarea)
    if (typeof(zone) === "string") return zone === this.subarea
    return true
}

export default Location