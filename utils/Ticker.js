import EventEnums from "../core/EventEnums";
import { Event } from "../core/Event";

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


let _countdownList = {}
/**
 * @param {Function} onTick fn to run every tick
 * @param {Number} initialTime seconds
 * @returns 
 */
export const addCountdown = (onTick, initialTime) => _countdownList[onTick] = [onTick, initialTime * 20]
const _updateCountdowns = () => {
    for (let key in _countdownList) {
      let time = _countdownList[key][1]--
        _countdownList[key][0](time / 20)
        if (time <= 0) delete _countdownList[key]
    }
} 
let _timerList = {}
/**
 * @param {Function} onTick fn to run every tick
 * @param {Number} endTime seconds
 * @returns 
 */
export const addTimer = (onTick, endTime, _currentTime = 0) => _timerList[onTick] = [onTick, endTime * 20, _currentTime * 20]
const _updateTimers = () => {
    for (let key in _timerList) {
        let time = _timerList[key][2]++
        _timerList[key][0](time / 20)
        if (time >= _timerList[key][1]) delete _timerList[key]
    }
}

let tps = 20;
const pastTps = [20, 20, 20];
let pastDate = 0;
export const getTPS = () => Math.min(...pastTps).toFixed(2)

/**
 * Credit: VolcAddons
 */
const _calcTPS = () => {
  const time = Date.now() - pastDate;
  tps = Math.min(20000 / time, 20);
  pastTps.shift();
  pastTps.push(tps);
  pastDate = Date.now();
}

new Event(EventEnums.INTERVAL.TICK, () => {
  _runTasks()
  _updateCountdowns()
  _updateTimers()
  _calcTPS()
}).register()