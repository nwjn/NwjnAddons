// Handles loading all Feature files because I was too lazy to type them all out
import Loader from "./data/Config"

let pathFinder = /Nwjn[\/\\]features[\/\\](.+[\/\\]\w+)\.js$/
let fileSeparator = /\\/g
let relativeDest = "./features/"

let modules = []

// Recursive discovery
let module = void function requireFeatures(file) {
    if (file.isDirectory()) return file.listFiles().forEach(requireFeatures)

    let match = file.getPath().match(pathFinder)
    
    if (match) modules.push(match[1].replace(fileSeparator, "/"))
}(new java.io.File(`${Config.modulesFolder}/Nwjn/features`))

try { for (module of modules) require(relativeDest + module) }

// Loads config and feature listeners after all feature modules are required
finally { Loader.load() }