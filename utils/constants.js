export const comma = (num) => {
  if(num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const version = (JSON.parse(FileLib.read("NwjnAddons", "metadata.json"))).version

export const consts = {
  PREFIX: "&d&l[NwjnAddons]&r",
  WIP: "&cThis feature is still in development!",
};

export const GUI_INSTRUCT = "Use +/- to change scale or press R to reset";