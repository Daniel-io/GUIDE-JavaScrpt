## 🧠 State Management in JavaScript — Core Concepts

### ✅ What is State?

State refers to the data your application uses and changes over time — e.g., score in a game, user login info, or UI status.

```js
let state = {
  score: 0,
  isGameOver: false
};
```

---

## 🌟 Why Manage State?

* Sync UI with data
* Handle user input and side effects
* Track changes predictably
* Avoid bugs from shared or stale data

---

## 🧩 Patterns of State Management

### 1. **Encapsulated Local State**

Each component/module manages its own state internally.

✅ Good for: Small, isolated components
❌ Bad for: Shared state between many modules

```js
function Counter() {
  let count = 0;
  return {
    increment() {
      count++;
      console.log(count);
    }
  };
}
```

---

### 2. **Centralized Global State**

One global state object, managed in a single place.

✅ Good for: Games, apps where many parts need access
❌ Risk: Everything touching global state = tight coupling

```js
let state = {
  score: 0,
  lives: 3
};

function updateScore(newScore) {
  state.score = newScore;
}
```

---

### 3. **Module + Controller Pattern (like MVC)**

Separate:

* State
* Logic/Controller
* View/DOM

```plaintext
[View] <---> [Controller] <--> [State]
```

✅ Benefits: Separation of concerns
🧠 You're already practicing this in your game code!

---

### 4. **Observer / Pub-Sub Pattern**

Let multiple parts "subscribe" to state changes.

```js
let state = {};
const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
}

export function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach(fn => fn(state));
}
```

✅ Good for: Decoupling UI updates from state changes
❌ Can be hard to trace who listens to what

---

### 5. **Immutable State + Pure Functions**

Don’t mutate state directly. Always return new objects.

```js
function updateScore(state, score) {
  return { ...state, score };
}
```

✅ Easy to test, track changes
❌ Slightly more verbose

---

### 6. **Finite State Machines (FSM)**

Only allow valid state transitions.

```js
const stateMachine = {
  idle: ['loading'],
  loading: ['success', 'error'],
  success: ['idle'],
};

let currentState = 'idle';

function transition(next) {
  if (stateMachine[currentState].includes(next)) {
    currentState = next;
  }
}
```

✅ Prevents invalid states
✅ Great for games and async flows
❌ Might be overkill for simple apps

---

## 🧪 Testing Your State Management

Checklist:

* ✅ Can you change state predictably?
* ✅ Can you reset everything cleanly?
* ✅ Does your UI reflect state?
* ✅ Can you test logic functions in isolation?

---

## 🔄 Lifecycle & Side Effects

You often need to:

* Initialize state
* Update it based on user or timer
* Reset it

Avoid logic that does both update and render. Instead:

```js
handleUserInput() → updateState() → notifyUI()
```

---

## 🛠️ Tools (for later)

You don’t need these now, but eventually:

* React + useState/useReducer
* Zustand / Redux / XState
* Vuex (for Vue)
* Recoil / MobX

---

## 📈 Summary

| Pattern        | Best Use Case        |
| -------------- | -------------------- |
| Local State    | Isolated components  |
| Global State   | Shared app-wide data |
| Observer       | Event-based updates  |
| FSM            | Complex flows/games  |
| Pure Functions | Predictable updates  |
