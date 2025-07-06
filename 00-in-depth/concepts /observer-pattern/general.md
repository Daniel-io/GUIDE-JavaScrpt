# 📘 JavaScript: Observer Pattern (Publish/Subscribe)

## ✅ What Is the Observer Pattern?

The **Observer Pattern** is a design pattern where a central object (called the **subject**) maintains a list of **observers** (aka **subscribers**) and notifies them automatically of state changes by calling their registered callback functions.

> Common in UI frameworks, games, event-driven systems, logging, and reactivity.

---

## 🔧 Key Terms

| Term                          | Meaning                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| **Subject**                   | The main object that holds the state and sends out notifications. |
| **Observer / Subscriber**     | A function or object that wants to be notified of changes.        |
| **Subscribe**                 | Register a new observer.                                          |
| **Unsubscribe**               | Remove an observer.                                               |
| **Notify / Emit / Broadcast** | Trigger all registered observers.                                 |

> ✅ Synonyms: Observer = Listener = Subscriber

---

## ✅ Why Use It?

* Decouples components — the subject doesn’t need to know who is listening.
* Makes systems more modular and flexible.
* Supports reactive designs and event-driven logic.
* Clean separation of data and behavior.

---

## 🧠 Best Practices Checklist

* [x] Always support `unsubscribe()` to prevent memory leaks.
* [x] Store subscriber functions in variables to enable unsubscription.
* [x] Use `[...listeners]` copy during notify to prevent mutation issues.
* [x] Consider `once()` functionality if needed.

---

## ⚠️ Gotchas

* Anonymous functions can't be unsubscribed from.
* Notification order is not guaranteed unless enforced.
* Modifying the `listeners` array during `notify()` can cause bugs.
* Memory leaks if subscribers are never removed.

---

## 📦 Basic Observer System (General Example)

### 1️⃣ Minimal Example

```js
const listeners = [];

function subscribe(fn) {
  listeners.push(fn);
}

function notify(data) {
  for (const fn of [...listeners]) {
    fn(data);
  }
}

function unsubscribe(fn) {
  const index = listeners.indexOf(fn);
  if (index !== -1) listeners.splice(index, 1);
}

// Usage
const logger = msg => console.log("Message received:", msg);
subscribe(logger);
notify("Hello observers!");
unsubscribe(logger);
```

---

### 2️⃣ Anonymous Function Caveat

```js
subscribe(function(msg) {
  console.log("Can't unsubscribe from this one");
});

// No way to unsubscribe because the function was anonymous
```

✅ To unsubscribe, store it:

```js
const fn = msg => console.log("Subscribing with named fn");
subscribe(fn);
unsubscribe(fn); // ✅
```

---

### 3️⃣ Observer With State Diff

```js
let state = { count: 0 };
const listeners = [];

function subscribe(fn) {
  listeners.push(fn);
}

function notify(newState, prevState) {
  for (const fn of [...listeners]) {
    fn(newState, prevState);
  }
}

function setState(newState) {
  const prevState = { ...state };
  state = { ...state, ...newState };
  notify(state, prevState);
}

// Usage
const display = (newS, oldS) => {
  if (newS.count !== oldS.count) {
    console.log("Count changed:", newS.count);
  }
};

subscribe(display);
setState({ count: 1 });
```

---

### 4️⃣ Clean-Up in React-like System

```js
function mountComponent() {
  const render = data => console.log("UI updated:", data);
  subscribe(render);

  // Return cleanup logic
  return () => unsubscribe(render);
}

const cleanup = mountComponent();
notify("Something changed");
cleanup(); // Unsubscribes
```

---

## ✅ Summary

* Observer pattern is a great way to handle decoupled communication.
* Always support unsubscribe.
* Use named functions to keep control.
* Use `for...of` and copy listeners with `[...listeners]` during notify to stay safe.

> Use this pattern when multiple parts of your app need to respond to changes from a central source.
