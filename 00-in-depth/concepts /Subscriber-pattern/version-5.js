const listeners = {
  [STATE_KEYS.ROLL_NUMBER]: new Set(),
  [STATE_KEYS.ACTIVE_PLAYER]: new Set(),
  // ... other keys
};

const fullStateListeners = new Set();  // new: listeners for any update

export const subscribeTo = (listener, key) => {
  if (key) {
    listeners[key]?.add(listener);
  } else {
    fullStateListeners.add(listener);
  }
};

export const unsubscribeFrom = (listener, key) => {
  if (key) {
    listeners[key]?.delete(listener);
  } else {
    fullStateListeners.delete(listener);
  }
};

// notify individual key listeners
const notifyKey = (key) => {
  const snapshot = { ..._state };
  listeners[key]?.forEach(listener => listener(snapshot));
};

// notify all full-state listeners
const notifyAll = () => {
  const snapshot = { ..._state };
  fullStateListeners.forEach(listener => listener(snapshot));
};

export const setState = (partialState) => {
  _state = {
    ..._state,
    ...partialState
  };

  // notify specific key listeners
  for (const key in partialState) {
    notifyKey(key);
  }

  // notify full state listeners once per update
  notifyAll();
};



subscribeTo(myListenerForRollNumber, STATE_KEYS.ROLL_NUMBER);
subscribeTo(myListenerForAnyStateChange);
