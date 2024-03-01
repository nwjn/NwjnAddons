export function fixLength(x) {
  if (x.toString().length === 2) return x;
  else return `0${x}`;
}

// Creidt: volcaddons on ct
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
  registers.forEach(trigger => {
    if (trigger[1]() && !trigger[2]) {
      trigger[0].register();
      trigger[2] = true;
    } else if (!trigger[1]() && trigger[2]) {
      trigger[0].unregister();
      trigger[2] = false;
    }
  });
}
delay(() => {
  setRegisters()
}, 1000);

// TODO: MAKE A FUNCTION TO FORMAT RENDERING HITBOXES AND MAKE A FILE THAT ARRAYS ARE PUSHED TO