// Creidt: volcaddons on ct for registerwhen and setregisters
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
setTimeout(() => {
  setRegisters()
}, 1000);