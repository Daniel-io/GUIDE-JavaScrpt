# Factory Pattern in JavaScript — Complete Guide and Examples

---

## What is a Factory?

A **factory** is a function or method that **creates and returns objects**. Instead of manually creating objects or instances everywhere in your code, you use a factory to centralize the creation logic.

Factories can customize the created objects based on parameters and hide complex setup steps.

---

## Why Use Factories?

* **Encapsulation:** Hide object creation details.
* **Customization:** Create different objects based on inputs.
* **Code reuse:** Avoid repeating object setup.
* **Flexibility:** Easily change the creation logic in one place.
* **Simplify:** Avoid using `new` and classes if preferred.

---

## Factory vs Constructor vs Class

| Concept     | What it is                           | Usage                        |
| ----------- | ------------------------------------ | ---------------------------- |
| Factory     | Function returning an object         | `const obj = createThing();` |
| Constructor | Function used with `new`             | `const obj = new Thing();`   |
| Class       | ES6 syntactic sugar for constructors | `const obj = new Thing();`   |

Factories don’t require `new` and are more functional.

---

## Example 1: Basic Factory Function

```js
function createUser(name, role) {
  return {
    name,
    role,
    describe() {
      console.log(`${this.name} is a ${this.role}`);
    }
  };
}

const user1 = createUser("Alice", "admin");
const user2 = createUser("Bob", "guest");

user1.describe(); // Alice is a admin
user2.describe(); // Bob is a guest
```

---

## Example 2: Factory with Conditional Logic

```js
function createVehicle(type) {
  if (type === "car") {
    return {
      wheels: 4,
      drive() {
        console.log("Driving a car");
      }
    };
  } else if (type === "bike") {
    return {
      wheels: 2,
      drive() {
        console.log("Riding a bike");
      }
    };
  } else {
    return {
      wheels: 0,
      drive() {
        console.log("Unknown vehicle");
      }
    };
  }
}

const car = createVehicle("car");
const bike = createVehicle("bike");

car.drive();  // Driving a car
bike.drive(); // Riding a bike
```

---

## Example 3: Factory for Logger Instances (Contextual Example)

```js
function createLogger(tag = "") {
  function timestamp() {
    return new Date().toISOString();
  }

  function baseLog(level, ...args) {
    const label = `[${level.toUpperCase()} - ${timestamp()}]${tag ? ` [${tag}]` : ""}`;
    console[level](label, ...args);
  }

  return {
    log: (...args) => baseLog("log", ...args),
    warn: (...args) => baseLog("warn", ...args),
    error: (...args) => baseLog("error", ...args),
  };
}

const appLogger = createLogger("App");
const dbLogger = createLogger("Database");

appLogger.log("Application started");
dbLogger.error("Connection failed");
```

---

## When to Use Factories?

* When you want to **hide complex creation** behind a simple function.
* When creating **many similar but customized objects**.
* To avoid repeating boilerplate code.
* When you want more control over what kind of object you create based on parameters.
* When avoiding `new` keyword or classes fits your style or project.

---

## Benefits of Factory Pattern

* Clean, readable code.
* Easier maintenance — update creation logic in one place.
* Helps organize code better, especially in large projects.
* Supports polymorphism by returning different types or shapes.
* Fits well with functional programming.

---

## Advanced: Abstract Factory (Brief Overview)

```js
function createThemeFactory(theme) {
  if (theme === "dark") {
    return {
      createButton() {
        return { color: "black", style: "dark-button" };
      },
      createText() {
        return { color: "white", style: "dark-text" };
      },
    };
  } else if (theme === "light") {
    return {
      createButton() {
        return { color: "white", style: "light-button" };
      },
      createText() {
        return { color: "black", style: "light-text" };
      },
    };
  }
}

const darkThemeFactory = createThemeFactory("dark");
const darkButton = darkThemeFactory.createButton();
console.log(darkButton); // { color: "black", style: "dark-button" }
```

---

## Summary

* **Factories** are functions that create and return objects.
* They help **abstract** and **simplify** object creation.
* Useful for **customization**, **code reuse**, and **maintainability**.
* Can replace or complement constructors and classes.
* Common and idiomatic pattern in JavaScript.

---

## Useful Links

* [MDN — Factory Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#factory_functions)
* [Refactoring Guru — Factory Pattern](https://refactoring.guru/design-patterns/factory-method)
* [JavaScript Design Patterns — Factory](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

---

**Feel free to ask for more examples or variations!**
