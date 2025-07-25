<!-- ====================================================================
   COMMAND/DISPATCH 
===================================================================== -->


## * The Command Dispatch Pattern 
is a design pattern where commands (or messages) are dispatched to handlers based on some key—usually a string or type. It's often used to decouple the request from the execution logic.



## 🧠 Basic Idea:
You have a central dispatcher that takes a command name and executes the corresponding function.



✅ Simple Example:

```js

// Command Handlers
const commands = {
  greet: (name) => `Hello, ${name}!`,
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};

// Dispatcher
function dispatch(commandName, ...args) {
  const command = commands[commandName];
  if (command) {
    return command(...args);
  } else {
    throw new Error(`Command "${commandName}" not found`);
  }
}

// Usage
console.log(dispatch('greet', 'Alice'));       // Hello, Alice!
console.log(dispatch('add', 5, 3));            // 8
console.log(dispatch('multiply', 4, 6));       // 24

```


## 🔁 BENEFITS

- Decouples logic: Easier to maintain and extend.
- Dynamic: You can add or remove commands at runtime.
- Testable: Commands can be tested in isolation.







<!-- old below - incorporate above -->




## 1. 🧩 Command Dispatcher Pattern (aka Command Pattern)

A clean, scalable way to map strings (commands) to functions (handlers).

```js
const actions = {
  check: handleCheck,
  again: handleAgain,
};

function dispatchAction(action) {
  const fn = actions[action];
  if (fn) fn();
  else log.warn(`Unknown action: ${action}`);
}

export const handleClicks = function(event) {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  dispatchAction(btn.dataset.action);
};
```

### ✅ Why use this pattern?

**1. Avoids switch/if bloat**

```js
// instead of:
if (action === 'check') handleCheck();
else if (action === 'reset') handleReset();

// do:
const actionMap = { check: handleCheck, reset: handleReset };
actionMap[action]?.();
```

**2. Decouples logic** — separates the string from the behavior

```js
const command = 'reset';
actionMap[command]?.();
```

**3. Extensible**

```js
actionMap['replay'] = handleReplay;
```

**4. Dynamic behavior**

```js
if (mode === 'dev') {
  actionMap.debug = handleDebug;
}
```

### 🧠 Real-World Usage

| Use Case           | Example                              |
| ------------------ | ------------------------------------ |
| UI Button Clicks   | `actionMap[button.dataset.action]()` |
| Keyboard Shortcuts | `keyMap['Ctrl+Z']()`                 |
| CLI Tools          | `commands['build']()`                |
| Redux Reducers     | `actionMap[action.type](state)`      |
| Game Dev           | `'jump' → player.jump()`             |
| Plugin Hooks       | `pluginHooks['onSave']()`            |

---

## 🧪 Pattern Comparison

### ❌ Without command pattern:

```js
function handleClick(action) {
  if (action === 'check') {
    handleCheck();
  } else if (action === 'reset') {
    handleReset();
  } else {
    console.warn('Unknown action');
  }
}
```

### ✅ With command pattern:

```js
const actionMap = {
  check: handleCheck,
  reset: handleReset,
};

function handleClick(action) {
  const fn = actionMap[action];
  if (fn) fn();
  else console.warn(`Unknown action: ${action}`);
}
```

### ✅ Summary

| Benefit            | Description                           |
| ------------------ | ------------------------------------- |
| ✅ Clean Syntax     | No switch/if chains                   |
| ✅ Easy to Extend   | Add/remove actions easily             |
| ✅ Dynamic Behavior | Supports runtime changes              |
| ✅ Scales Well      | Great for UI, CLI, keyboard, game dev |

👉 **Use this pattern when mapping string commands to behaviors that may grow, vary, or repeat.**