import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("tick", (elapsed) => {
  // once every 2 ticks
  if (elapsed % 2 !== 0) return;

  const buildText = KuudraUtil.getBuild()

  let i = buildText.length
  while (i--) {
    let name = buildText[i].getName().removeFormatting()
    if (!name.includes("Building Progress")) continue;

    // Entity{name=Building Progress 2% (0 Players Helping), x=-101.5, y=84.125, z=-105.5} (10)
    KuudraUtil.build = name.substring(0, name.indexOf("%")).replace(/\D/g, "")
    KuudraUtil.builders = name.substring(name.indexOf("(") + 1, name.indexOf("(") + 2)
    
    break;
  }
}), () => KuudraUtil.inPhase(2))