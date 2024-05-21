// import Settings from "../Amaterasu/core/Settings"
// import { version } from "./utils/constants"
// import kuudraConfig from "./features/Kuudra/KuudraConfig";

// const changelog = FileLib.read("NwjnAddons", "changelog.md")
// const readme = FileLib.read("NwjnAddons", "README.md")
// const defaultConfig = JSON.parse(FileLib.read("NwjnAddons", "configData/default.json"))

// const setting = new Settings("NwjnAddons", "configData/settings.json", "configData/scheme.json", defaultConfig, `§d§l[NwjnAddons-v${version}]§r by nwjn`)
//     .setCommand("nwjn2", ["nwjntest"])
//     .onClick("Kuudra", "kuudra", () => kuudraConfig.openGUI())
//     .addChangelog(changelog)
//     .addMarkdown("README", readme)

//     .setPos(15, 15)
//     .setSize(70, 70)
//     .apply()

// export default () => setting.settings