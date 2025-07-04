/* ===================================================================================== 
Version Two - Factory
===================================================================================== */





// logger.js
const ENV = "development";

function timestamp() {
  return new Date().toLocaleString();
}

function baseLog(level, tag, ...args) {
  if (ENV !== "production") {
    const label = `[${level.toUpperCase()} - ${timestamp()}]${tag ? ` [${tag}]` : ""}`;
    console[level](label, ...args);
    if (level === "error") {
      console.trace();
    }
  }
}

export function createLogger(tag = "") {
  return {
    log: (...args) => baseLog("log", tag, ...args),
    warn: (...args) => baseLog("warn", tag, ...args),
    error: (...args) => baseLog("error", tag, ...args),
    trace: (...args) => baseLog("trace", tag, ...args),
    debug: (...args) => baseLog("debug", tag, ...args),
  };
}

















// USAGE EXAMPLE IN MODULE FILES





// player.js
import { createLogger } from "./logger.js";

const log = createLogger("Player");

log.log("Player spawned");
log.warn("Low health");
log.error("Player crashed");
log.trace("Trace for debugging");
log.debug("Extra info");


// Output example 
/*
[LOG - 2025-07-03T23:50:00.000Z] [Player] Player spawned
[WARN - 2025-07-03T23:50:01.000Z] [Player] Low health
[ERROR - 2025-07-03T23:50:02.000Z] [Player] Player crashed
[TRACE - 2025-07-03T23:50:03.000Z] [Player] Trace for debugging
[DEBUG - 2025-07-03T23:50:04.000Z] [Player] Extra info
*/