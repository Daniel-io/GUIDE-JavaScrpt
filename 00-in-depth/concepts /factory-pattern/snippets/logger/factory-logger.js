/**
 * Log levels used throughout the logger.
 * These map to console methods and help avoid string typos.
 * @readonly
 * @enum {string}
 */

const LOG_LEVELS = {
  LOG: 'log',
  WARN: 'warn',
  ERROR: 'error',
  TRACE: 'trace',
  DEBUG: 'debug'
};

/** 
 * Current environment setting.
 * Change to 'production' to disable most logs.
 * @constant {string} 
 */

const ENV = "development";

/**
 * Returns the current timestamp formatted as a locale string.
 * @returns {string} Current date and time string.
 */

function timestamp() {
  return new Date().toLocaleString();
}

/**
 * Logs a message to the console with a formatted label, depending on the log level and environment.
 * For errors, also prints a stack trace.
 * 
 * @param {string} level - One of the LOG_LEVELS values representing the log severity.
 * @param {string} tag - Optional tag to identify the source/module of the log.
 * @param {...any} args - Additional arguments to pass to the console method.
 */

function baseLog(level, tag, ...args) {
  if (ENV !== "production") {
    const label = `[${level.toUpperCase()} - ${timestamp()}]${tag ? ` [${tag}]` : ""}`;
    console[level](label, ...args);
    if (level === LOG_LEVELS.ERROR) {
      console.trace();
    }
  }
}

/**
 * Factory function to create a logger object for a specific tag/module.
 * Provides methods to log at different severity levels.
 * 
 * @param {string} [tag=""] - Optional tag to prepend to log messages (e.g. module name).
 * @returns {{log: Function, warn: Function, error: Function, trace: Function, debug: Function}} Logger object.
 */
export function createLogger(tag = "") {
  return {
    log: (...args) => baseLog(LOG_LEVELS.LOG, tag, ...args),
    warn: (...args) => baseLog(LOG_LEVELS.WARN, tag, ...args),
    error: (...args) => baseLog(LOG_LEVELS.ERROR, tag, ...args),
    trace: (...args) => baseLog(LOG_LEVELS.TRACE, tag, ...args),
    debug: (...args) => baseLog(LOG_LEVELS.DEBUG, tag, ...args),
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