// 1. Define log level priorities



const LOG_LEVEL_PRIORITIES = {
  [LOG_LEVELS.ERROR]: 0,
  [LOG_LEVELS.WARN]: 1,
  [LOG_LEVELS.LOG]: 2,
  [LOG_LEVELS.TRACE]: 3,
  [LOG_LEVELS.DEBUG]: 4
};

// 2. Configure global log level and environment

const ENV = "development"; // 'production' | 'development' | 'test'
const CURRENT_LOG_LEVEL = ENV === "production" ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;



// 3. Modify baseLog() to filter by level


function baseLog(level, tag, ...args) {
  const levelPriority = LOG_LEVEL_PRIORITIES[level];
  const currentPriority = LOG_LEVEL_PRIORITIES[CURRENT_LOG_LEVEL];

  if (levelPriority <= currentPriority) {
    const label = `[${level.toUpperCase()} - ${timestamp()}]${tag ? ` [${tag}]` : ""}`;
    console[level === LOG_LEVELS.DEBUG ? 'log' : level](label, ...args);

    if (level === LOG_LEVELS.ERROR || level === LOG_LEVELS.TRACE) {
      console.trace();
    }
  }
}
// console.debug is not widely visible by default in many environments, so we use console.log for it unless you prefer otherwise.



// 4. Allow optional dynamic override (optional) 

let currentLogLevel = CURRENT_LOG_LEVEL;

export function setLogLevel(level) {
  if (LOG_LEVEL_PRIORITIES.hasOwnProperty(level)) {
    currentLogLevel = level;
  }
}

// // In baseLog, replace:
// const currentPriority = LOG_LEVEL_PRIORITIES[CURRENT_LOG_LEVEL];
// // with:
// const currentPriority = LOG_LEVEL_PRIORITIES[currentLogLevel];



// ✅ Final Notes:
// In production, set the level to 'warn' or 'error' to show only important logs.

// In development, keep it at 'debug' to show everything.


// index.js or entry point
import { setLogLevel } from './logger.js';

if (process.env.NODE_ENV === 'production') {
  setLogLevel('warn'); // Only warn and error will show
} else {
  setLogLevel('debug'); // Everything will show
}
