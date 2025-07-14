import { createLogger } from "../utility/logger.js"; 

// Create a logger instance scoped to 'state' module for debugging and info
const log = createLogger('state');

// Centralized constants for all your state keys
// Helps avoid typos and makes refactoring easier
export const STATE_KEYS = {
  ROLL_NUMBER: 'rollNumber'
}

// Initial state generator function
// Returns a fresh initial state object with default values
const generateState = function() {
  return {
    [STATE_KEYS.ROLL_NUMBER]: 1 // Default roll number set to 1
  }
}

// Internal private state object holding current state values
let _state = generateState();

// Listener collections organized by state key
// Each key maps to a Set of subscriber callback functions
const listeners = {
  [STATE_KEYS.ROLL_NUMBER]: new Set()
}

// Public method for components/modules to subscribe to updates on a specific key
// Adds a listener function to the Set for the given key
export const subscribeTo = (listener, key) => listeners[key]?.add(listener);

// Public method to remove/unsubscribe a listener from updates for a specific key
export const unsubscribeFrom = (listener, key) => listeners[key]?.delete(listener);

// Internal helper function to notify all subscribers of a key when its value changes
// Passes only the new value of the key to the listener callbacks
const notify = (key) => {
  const value = _state[key]; // Get current value for the key
  listeners[key]?.forEach(listener => listener(value)); // Call each subscriber with the new value
};

// Public getter that returns a shallow copy of the current entire state
// Prevents external code from accidentally mutating the private _state object
export const getState = function (_params) {
  return { ..._state }
}

// Public setter to update one or more keys in the state at once
// Merges partialState into the existing _state immutably
// Then notifies subscribers for each changed key
export const setState  = function(partialState) {

  _state = {
    ..._state,        // Copy existing state properties
    ...partialState   // Override with new values from partialState
  }

  // Notify subscribers for each updated key
  for (const key in partialState) {
    notify(key);
  }
  
  // Log the updated state (for debugging / tracing)
  log.log(_state)
}




// USAGE 

//Set Subscribers
subscribeTo(viewController.rollUpdateListeners, STATE_KEYS.ROLL_NUMBER);


export const viewController = {

  rollUpdateListeners(rollNumber) {
    update.diceImageUI(rollNumber );
  }

}