# 📘 JavaScript Best Practices & Conventions

A complete list of modern best practices, coding conventions, and design patterns to write clean, maintainable, and scalable JavaScript.

---

## 1. ✅ Consistent Naming Conventions

* **CamelCase** for variables and function names:

  ```js
  let userName = 'Alice';
  function getUserInfo() { ... }
  ```

* **PascalCase** for classes and constructors:

  ```js
  class UserProfile { ... }
  ```

* **UPPER\_SNAKE\_CASE** for constants:

  ```js
  const MAX_USERS = 100;
  ```

* **Descriptive Names** over single-letter variables:

  ```js
  let firstName = 'Alice'; // ✅
  let x = 'Alice';         // ❌
  ```

---

## 2. 🔒 Use `const` and `let`, Avoid `var`

* `const` = variables that **won’t** change
* `let` = variables that **might** change
* ❌ Avoid `var` (function-scoped)

```js
const name = 'Alice';
let age = 25;
```

---

## 3. ➡️ Use Arrow Functions for Anonymous Functions

```js
const add = (a, b) => a + b;
```

---

## 4. 🔠 Use Template Literals

Avoid `+` concatenation:

```js
const name = 'Alice';
const greeting = `Hello, ${name}!`;
```

---

## 5. ⚙️ Use Default Parameters

```js
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}
```

---

## 6. 📦 Use Destructuring

```js
const person = { name: 'Alice', age: 25 };
const { name, age } = person;
```

---

## 7. 🌍 Avoid Global Variables

Encapsulate using functions or modules:

```js
(function () {
  const localVariable = 'I am local';
})();
```

---

## 8. 🫰 Always Use Strict Mode

```js
'use strict';
```

---

## 9. ❌ Avoid Implicit Type Coercion

Use `===` for strict comparison:

```js
if (a === 5) { ... }
```

---

## 10. 💠 Handle Errors Gracefully

```js
try {
  const result = riskyOperation();
} catch (error) {
  console.error('Something went wrong:', error);
}
```

---

## 11. 🧵 Minimize Nested Callbacks

Use `async/await`:

```js
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
  } catch (err) {
    console.error(err);
  }
}
```

---

## 12. 📝 Commenting & Documentation

```js
/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

---

## 13. ⚠️ Avoid `eval()`

```js
// Avoid this
eval("alert('Hello')");
```

---

## 14. 🔀 Use `for...of` for Arrays

```js
const arr = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}
```

---

## 15. 🧪 Use `Object.freeze()` for Immutability

```js
const obj = Object.freeze({ name: 'Alice' });
obj.name = 'Bob'; // ❌ Won’t change
```

---

## 16. 🚀 Be Mindful of Performance

* Avoid deep loops
* Use `Map` and `Set` for large data
* Cache DOM references
* Don’t re-declare big arrays inside loops

---

## 17. 📂 Use ES6 Modules

```js
// utils.js
export function sum(a, b) { return a + b; }

// main.js
import { sum } from './utils.js';
```

---

## 18. 🧠 Optimize Memory Usage

* Avoid keeping references you don’t need
* Be cautious of **closures** holding memory

---

## 19. 🛉 Use Linting Tools

```json
{
  "extends": "eslint:recommended",
  "env": { "browser": true, "node": true },
  "rules": {
    "no-console": "warn",
    "eqeqeq": "error",
    "semi": ["error", "always"]
  }
}
```

---

## 20. 🧪 Test Your Code

Use **Jest** or **Mocha** for unit testing. Try Test-Driven Development (TDD) when possible.

---

## 21. ❌ Avoid `with`

```js
// Confusing, don’t use:
with (obj) {
  console.log(a);
}
```

---

## 22. `this` Context Awareness

```js
const person = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
```

---

## 23. Understand the Event Loop

Learn how the call stack, task queue, and microtasks work.

---

## 24. Use `Map` & `Set` for Efficiency

```js
const users = new Set();
const cache = new Map();
```

---

## 25. Use `async/await` with `try/catch`

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

---

## 26. 🕵️ Use `Proxy` for Custom Behavior

```js
const user = new Proxy({ name: 'Alice' }, {
  get(target, prop) {
    return prop === 'name' ? target[prop].toUpperCase() : target[prop];
  }
});
```

---

## 27. Embrace Immutability

```js
const updated = { ...original, changed: true };
```

---

## 28. Deep Clone Carefully

```js
const copy = JSON.parse(JSON.stringify(obj)); // shallow-safe
```

---

## 29. Prefer `map()`, `filter()`, `reduce()`

```js
const doubled = numbers.map(n => n * 2);
```

---

## 30. Extract Large Inline Functions

Break logic into small, named functions.

---

## 31. Use `===` Always

```js
5 === '5'; // false
```

---

## 32. Learn the SOLID Principles

Especially useful in large, OOP-style JS projects.

---

## 33. Use Event Delegation

```js
document.getElementById('parent').addEventListener('click', function(event) {
  if (event.target && event.target.matches('button.classname')) {
    // Handle button click
  }
});
```

---

## 34. Don’t Overuse Libraries

Know when you need Lodash or React, and when you don’t.

---

## 35. Follow CSS/HTML Best Practices

* Separate CSS/JS/HTML
* Write semantic HTML

---

## 36. Do Code Reviews

* Get a second pair of eyes
* Learn from others

---

## 37. Ensure Accessibility (A11y)

* Focus states
* ARIA roles
* Screen reader support

---

## 38. Use Git with Good Commits

* Use descriptive commit messages
* Consider [Conventional Commits](https://www.conventionalcommits.org/)

---

## 39. Learn Modern Bundlers

Use **Vite**, **Webpack**, or **Parcel** to build production apps.

---

## 40. Use DevTools for Debugging

* Use breakpoints
* Use `console.table()` and `console.profile()`

---

## 41. Stay Up-to-Date

Track new features:

* Optional chaining (`?.`)
* Nullish coalescing (`??`)
* Top-level await

---

## 42. 🛡️ JavaScript Security

* Sanitize inputs
* Avoid XSS & CORS issues
* Use HTTPS and content security policies

---

## ✨ Final Words

By following these conventions, your JavaScript code will be:

* Cleaner
* More maintainable
* Easier to test
* Less prone to bugs
* Professional-grade

Happy coding! 🎉
