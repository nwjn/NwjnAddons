import EventEnums from "../core/EventEnums";
import { Event } from "../core/Event";
import DraggableGui from "./DraggableGui";

let _scheduleTaskList = []
/**
 * - Runs the given function after the delay is done
 * - NOTE: These are server ticks not client ticks for that use ct's one
 * @param {() => void} fn The function to be ran
 * @param {number?} delay The delay in ticks
 * @author DocilElm
 */
export const scheduleTask = (fn, delay = 1) => _scheduleTaskList.push([fn, delay])

const _runTasks = () => {
  // Credit: DocilElm
  for (let idx = _scheduleTaskList.length - 1; idx >= 0; idx--) {
    let delay = _scheduleTaskList[idx][1]--
    if (delay !== 0) continue

    let fn = _scheduleTaskList[idx][0]
    fn()

    _scheduleTaskList.splice(idx, 1)
  }
}


let _timerList = []
/**
 * @param {DraggableGui} overlay 
 * @param {Number} initialTime seconds
 * @returns 
 */
export const addTimer = (overlay, message, initialTime) => _timerList.push([overlay, message, initialTime * 20])
const _updateTimers = () => {
  for (let idx = _timerList.length - 1; idx >= 0; idx--) {
    let delay = _timerList[idx][2]--
    
    if (delay === 0) _timerList.splice(idx, 1)
    else _timerList[idx][0].drawText(`${ _timerList[idx][1] } ${ (_timerList[idx][2] / 20).toFixed(2) }s`)
    
  }
} 

// Credit: Volc for tps calc
let tps = 20;
const pastTps = [20, 20, 20];
let pastDate = 0;
export const getTPS = () => Math.min(...pastTps).toFixed(2)

const _calcTPS = () => {
  const time = Date.now() - pastDate;
  tps = Math.min(20000 / time, 20);
  pastTps.shift();
  pastTps.push(tps);
  pastDate = Date.now();
}

new Event(EventEnums.INTERVAL.TICK, () => {
  _runTasks()
  _updateTimers()
  _calcTPS()
}).register()