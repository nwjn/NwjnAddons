import Location from "../../../tska/skyblock/Location"

Location.nwjn$inWorlds = function (worlds) {
    if (!worlds) return true

    const area = this.area?.toLowerCase()?.removeFormatting()
    if (area && worlds.some(w => area.includes(w))) return true
}

Location.nwjn$inZones = function (zones) {
    if (!zones) return true

    const zone = this.subarea?.toLowerCase()?.removeFormatting()
    if (zone && zones.some(w => zone.includes(w))) return true
}

export default Location