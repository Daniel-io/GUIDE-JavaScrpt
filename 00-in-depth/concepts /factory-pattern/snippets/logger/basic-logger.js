/* ===================================================================================== 
Version One - Basic
===================================================================================== */






const ENV = "development"; // or dynamically detect it

function timestamp() {
  return new Date().toISOString();
}

export const logger = {
  log(...args) {
    if (ENV !== "production") {
      console.log(`[LOG - ${timestamp()}]`, ...args);
    }
  },
  warn(...args) {
    if (ENV !== "production") {
      console.warn(`[WARN - ${timestamp()}]`, ...args);
    }
  },
  error(...args) {
    if (ENV !== "production") {
      console.error(`[ERROR - ${timestamp()}]`, ...args);
      console.trace();
    }
  },
  trace(...args) {
    if (ENV !== "production") {
      console.log(`[TRACE - ${timestamp()}]`, ...args);
      console.trace();
    }
  },
  debug(...args) {
    if (ENV !== "production") {
      console.debug(`[DEBUG - ${timestamp()}]`, ...args);
    }
  }
};







