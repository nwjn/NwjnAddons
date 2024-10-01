export function fixLength(x) {
  return (x.toString().length === 2 ? x : `0${x}`)
}

// Creidt: My father, Volcaronitee
  const Threading = Java.type("gg.essential.api.utils.Multithreading");
  export function delay(func, time) {
    if (time) {
      Threading.schedule(() => { func() }, time, java.util.concurrent.TimeUnit.MILLISECONDS);
    } else {
      Threading.runAsync(() => { func() });
    }
  }

  let registers = [];
  export function registerWhen(trigger, dependency) {
    registers.push([trigger.unregister(), dependency, false]);
  }

  export function setRegisters() {
    let i = registers.length
    while (i--) {
      let trigger = registers[i]
      if (trigger[1]() && !trigger[2]) {
        trigger[0].register();
        trigger[2] = true;
      } else if (!trigger[1]() && trigger[2]) {
        trigger[0].unregister();
        trigger[2] = false;
      }
    }
}
//

export function getRGB([r, g, b, a]) {
  return [r/255, g/255, b/255, a/255]
}

const SMA = net.minecraft.entity.SharedMonsterAttributes
export function getMaxHP(entity) {
  return entity.entity.func_110148_a(SMA.field_111267_a).func_111125_b()
}

export function getNowHP(entity) {
  return entity.entity.func_110143_aJ()
}

/**
   * Clamps a value between a min and max limit
   * @param {Number} value
   * @param {Number} min 
   * @param {Number} max 
   * @returns {Number}
   */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export function getDistance([x1, y1, z1], [x2, y2, z2]) {
  return Math.abs(Math.hypot(x1 - x2, y1 - y2, z1 - z2))
}

const fontRenderer = Renderer.getFontRenderer()
const renderManager = Renderer.getRenderManager()
/**
 * Just Tesselator#drawString with depth check
 *
 * Renders floating lines of text in the 3D world at a specific position.
 *
 * @param {String} text The string array of text to render
 * @param {Number} x X coordinate in the game world
 * @param {Number} y Y coordinate in the game world
 * @param {Number} z Z coordinate in the game world
 * @param {Number} scale the scale of the text
 * @param {Number} color the color of the text
 * @param {Boolean} increase whether to scale the text up as the player moves away
 * @param {Boolean} depth whether to show through walls
 */
export function tessellateStringWithDepth(
  text,
  x,
  y,
  z,
  scale = 1,
  color = 0xffffff,
  increase = false,
  depth = false
) {
  const lText = text.addColor()
  const renderPos = Tessellator.getRenderPos(x, y, z)
  
  let lScale = scale
  if (increase) {
    const distance = Math.sqrt(renderPos.x * renderPos.x + renderPos.y * renderPos.y + renderPos.z * renderPos.z)
    const multiplier = distance / 120 //mobs only render ~120 blocks away
    lScale *= 0.45 * multiplier
  }
  const xMultiplier = Client.getMinecraft().field_71474_y.field_74320_O == 2 ? -1 : 1

  Tessellator.colorize(1, 1, 1, 0.5)
  Tessellator.pushMatrix()

  Tessellator.translate(renderPos.x, renderPos.y, renderPos.z)
  Tessellator.rotate(-renderManager.field_78735_i, 0, 1, 0)
  Tessellator.rotate(renderManager.field_78732_j * xMultiplier, 1, 0, 0)

  Tessellator.scale(-lScale, -lScale, lScale)
  Tessellator.disableLighting()
  Tessellator.depthMask(false)
  if (depth) {
    Tessellator.disableDepth()
  }

  Tessellator.enableBlend()
  Tessellator.blendFunc(770, 771)

  const textWidth = fontRenderer.func_78256_a(lText)
  fontRenderer.func_78276_b(lText, -textWidth / 2, 0, color)

  Tessellator.colorize(1, 1, 1, 1)
  Tessellator.depthMask(true)
  Tessellator.enableDepth()
  Tessellator.popMatrix()
}

/**
 * Strips rank and tags from player
 *
 * @param {String} player
 * @returns {String} Player base ign
 */
export function getPlayerName(player) {
  return player.split("] ").slice(-1).toString().replace(/[^\w_]/g, "")
}

  /**
   * Checks if the player entity is a real user
   * @param {PlayerMP} player 
   * @returns {Boolean}
   */
export function realPlayer(player) {
  return (player?.getPing() === 1)
}