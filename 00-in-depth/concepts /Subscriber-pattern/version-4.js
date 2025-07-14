import { inspectObject } from "../utility/inspectObject.js";
import { createLogger } from "../utility/logger.js"; 

const log = createLogger('state');



export const STATE_KEYS = {
  ROLL_NUMBER: 'rollNumber',
  ACTIVE_PLAYER: 'activePlayer',
  CURRENT_SCORE: 'currentScore',
  PLAYER_SCORES: 'playerScores',
  WINNER: 'winner',
  IS_GAME_LIVE: 'isGameLive'
}


const generateState = function() {
  return {
    [STATE_KEYS.ROLL_NUMBER]: 1,
    [STATE_KEYS.ACTIVE_PLAYER]: 0,
    [STATE_KEYS.CURRENT_SCORE]: 0,
    [STATE_KEYS.PLAYER_SCORES]: [0, 0],
    [STATE_KEYS.WINNER]: 'undefined',
    [STATE_KEYS.IS_GAME_LIVE]: true,
  }
}

let _state = generateState();







const listeners = {
  [STATE_KEYS.ROLL_NUMBER]: new Set(),
  [STATE_KEYS.ACTIVE_PLAYER]: new Set(),
  [STATE_KEYS.PLAYER_SCORES]: new Set(),
  [STATE_KEYS.CURRENT_SCORE]: new Set(),
  [STATE_KEYS.WINNER]: new Set()
}

export const subscribeTo = (listener, key) => listeners[key]?.add(listener);
export const unsubscribeFrom = (listener, key) => listeners[key]?.delete(listener);

const notify = (key) => {
  const snapshot = { ..._state };
  listeners[key]?.forEach(listener => listener(snapshot));
};







export const getState = function (_params) {
  return { ..._state }
}

const applyStateUpdate = function(partialState) {
  // inspectObject(partialState).keys();
  return {
    ..._state, 
    ...partialState
  };
}


export const setState  = function(partialState) {
  _state = applyStateUpdate(partialState);

  for (const key in partialState) {
    notify(key);
  }
  // console.log(_state);

}


export const resetState = function() {
  
}