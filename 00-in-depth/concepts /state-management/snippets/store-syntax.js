// gameStore.js
import { createLogger } from "../utils/logger/logger";
import { STATE_INITIAL_VALUES, STATE_KEYS } from "../constants/stateContants";

const { log } = createLogger('gameStore');

let _state = null;
let _prevState = null;

// ✅ Initialize store state
export const createGameStore = () => {
  _state = {
    [STATE_KEYS.GAME_PLAY_PHASE]: STATE_INITIAL_VALUES[STATE_KEYS.GAME_PLAY_PHASE],
    [STATE_KEYS.CURRENT_SCORE]: STATE_INITIAL_VALUES[STATE_KEYS.CURRENT_SCORE],
    [STATE_KEYS.PLAYER_SCORES]: STATE_INITIAL_VALUES[STATE_KEYS.PLAYER_SCORES],
    [STATE_KEYS.DICE_ROLL_NUMBER]: STATE_INITIAL_VALUES[STATE_KEYS.DICE_ROLL_NUMBER],
    [STATE_KEYS.ACTIVE_PLAYER]: STATE_INITIAL_VALUES[STATE_KEYS.ACTIVE_PLAYER],
  };
  return _state;
};

// ✅ Pub/Sub
const globalSubscribers = new Set();
const keyedSubscribers = {
  [STATE_KEYS.DICE_ROLL_NUMBER]: new Set(),
  [STATE_KEYS.CURRENT_SCORE]: new Set(),
  [STATE_KEYS.ACTIVE_PLAYER]: new Set(),
  [STATE_KEYS.PLAYER_SCORES]: new Set(),
  [STATE_KEYS.GAME_PLAY_PHASE]: new Set()
};

export const subscribe = (fn, key) => {
  key ? keyedSubscribers[key].add(fn) : globalSubscribers.add(fn);
  log('Subscribed', key || 'global');
};

export const unsubscribe = (fn, key) => {
  key ? keyedSubscribers[key].delete(fn) : globalSubscribers.delete(fn);
  log('Unsubscribed', key || 'global');
};

// ✅ Publish updates
const publishKeyed = (key, value) => {
  const subs = keyedSubscribers[key];
  if (subs instanceof Set) subs.forEach((fn) => fn(value));
};

const publishGlobal = () => {
  const snapshot = structuredClone(_state);
  globalSubscribers.forEach((fn) => fn(snapshot));
};

const notify = (partial) => {
  for (const key in partial) publishKeyed(key, partial[key]);
  publishGlobal();
};

// ✅ Store API
export const getGameState = () => ({ ..._state });

export const setGameState = (partialState) => {
  _prevState = _state;
  _state = { ..._state, ...partialState };
  notify(partialState);
  log('Updated State', _state);
};

export const resetGameState = () => {
  _state = createGameStore();
  notify(_state);
  log('Reset State', _state);
};










// # Naming Conventions Guide (Refactored with `_storeState`)

// ## Store Example


// userStore.js

let _storeState = null;
let _prevStoreState = null;

export const userStore = {
  init(initialState = {}) {
    _storeState = { ...initialState };
    _prevStoreState = { ...initialState };
  },

  getState() {
    return structuredClone(_storeState);
  },

  setState(partialState) {
    _prevStoreState = structuredClone(_storeState);
    _storeState = { ..._storeState, ...partialState };
  },

  getPrevState() {
    return structuredClone(_prevStoreState);
  },

  resetState() {
    _prevStoreState = structuredClone(_storeState);
    _storeState = {};
  }
};


// **Notes:**

// * Using `_storeState` and `_prevStoreState` keeps the variable purpose explicit.
// * Works best when the file is a dedicated store module.
// * `Store` suffix signals shared state management across app components.
