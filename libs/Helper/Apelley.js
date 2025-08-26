import ConfigProperty from "../../data/ConfigProperty"

import * as Apelles from "../../../Apelles/index"
const ApellesRenderer = Java.type("com.perseuspotter.apelles.Renderer")

let graphicsDefault
function swapRender(useNew, opCodeIn) {
    graphicsDefault ??= ApellesRenderer.USE_NEW_SHIT

    if (!opCodeIn) useNew = graphicsDefault
    else if (opCodeIn === 1) useNew = true
    else if (opCodeIn === 2) useNew = false

    ApellesRenderer.USE_NEW_SHIT = useNew
}

const ApellesCompat = new ConfigProperty("DropDown", {
    category: "Home",
    subcategory: "Preferences",
    configName: "apellesCompat",
    title: "§e✯§r Rendering Compatibility",
    description: "§cChange this if your renderings appear §fPure White",
    options: [ "GPU Default", "Advanced Rendering", "Normal Rendering" ],
    registerListener: swapRender,
    value: 0
})

let initCompat = register("worldLoad", () => {
    initCompat.unregister()
    initCompat = null

    Client.scheduleTask(10, () => swapRender(null, ApellesCompat.value))
})

// Need export outliners from Apelles or transform createOutline functions to push seperately to here and check if it affects other modules
// Need setType on outliners
function setOutlineType(_, opCodeIn) {
    const unIndexed = opCodeIn + 1

    Apelles.outliners?.forEach(o => o?.setType(unIndexed))
}

const OutlineType = new ConfigProperty("DropDown", {
    category: "Home",
    subcategory: "Preferences",
    configName: "outlineType",
    title: "§e✯§r Render Outline Type",
    description: "Changes the outlining method, figure out which looks and performs best for you! (Effective on restart/reload)",
    options: [ "Jump Flooding", "Roberts Cross", "Sobel", "Blur" ],
    registerListener: setOutlineType,
    value: 0
})

let initOutline = register("worldLoad", () => {
    initOutline.unregister()
    initOutline = null

    Client.scheduleTask(10, () => setOutlineType(null, OutlineType.value))
})

export default Apelles