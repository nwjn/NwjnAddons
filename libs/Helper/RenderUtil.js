import Config from "../../data/Config"
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

let initialCheck = register("worldLoad", () => {
    initialCheck.unregister()
    initialCheck = null

    Client.scheduleTask(10, () => swapRender(null, ApellesCompat.value))
})


export default Apelles