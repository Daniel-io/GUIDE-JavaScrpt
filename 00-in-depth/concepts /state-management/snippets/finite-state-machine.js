// 1. Define valid state transitions
const gameStates = {
  idle: ['playing'],              // initial waiting state
  playing: ['won', 'lost', 'resetting'],
  won: ['resetting'],
  lost: ['resetting'],
  resetting: ['idle']
};

// 2. Current state object, starting at 'idle'
let state = {
  gamePhase: 'idle'
};

// 3. Transition helper returning a new state object (immutable)
function transitionTo(nextPhase, currentState) {
  const current = currentState.gamePhase;
  const allowed = gameStates[current];

  if (!allowed) {
    console.warn(`⚠️ Unknown current state: "${current}"`);
    return currentState; // no change
  }

  if (allowed.includes(nextPhase)) {
    return { ...currentState, gamePhase: nextPhase };
  } else {
    console.warn(`❌ Invalid transition from "${current}" to "${nextPhase}"`);
    return currentState; // no change
  }
}

// 4. Usage example
state = transitionTo('playing', state);  // ✅ valid transition
console.log(state.gamePhase);             // "playing"

state = transitionTo('lost', state);     // ✅ valid transition from 'playing' to 'lost'
console.log(state.gamePhase);             // "lost"

state = transitionTo('won', state);      // ❌ invalid transition from 'lost' to 'won' - state unchanged
console.log(state.gamePhase);             // still "lost"
