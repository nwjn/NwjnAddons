// Credit: DocilElm
let idx = 0

export default {
  INTERVAL: {
    FPS: idx++,
    SECONDS: idx++,
    TICK: idx++ // Server ticks
  },
  ENTITY: {
    RENDER: idx++,
    // POSTRENDER: idx++,
    JOINWORLD: idx++,
    SPAWNMOB: idx++,
    // SPAWNPARTICLE: idx++,
    DEATH: idx++
  },
  CLIENT: {
    CHAT: idx++,
    COMMAND: idx++,
    SOUNDPLAY: idx++,
    HELDITEMCHANGE: idx++,
    PLAYERPOSLOOK: idx++
    // DIGGING: idx++,
    // BLOCKPLACEMENT: idx++
  },
  SERVER: {
    CHAT: idx++,
    ACTIONBAR: idx++,
    SCOREBOARD: idx++,
    TABUPDATE: idx++,
    TABADD: idx++,
    // COLLECTITEM: idx++,
    // BLOCKCHANGE: idx++,
    // MULTIBLOCKCHANGE: idx++
  },
  WINDOW: {
    OPEN: idx++,
    CLOSE: idx++,
    CLICK: idx++,
    ITEMS: idx++
  }
}