<!-- ====================================================================== 
    VALIDATION
    ====================================================================== -->


# Validation — Key Concepts


## What is validation?
- The process of checking if data meets certain criteria or rules before it is accepted or processed.



## Why validate?
- To ensure data integrity, correctness, and security by preventing invalid, malformed, or harmful inputs.



## When to validate?

- On user input (forms, UI fields) before processing or saving.
- Before performing calculations or operations that depend on data type or range.
- When receiving external data (APIs, files, databases) to avoid unexpected errors.
- At multiple points in an app to maintain consistency and safety.



## What do you validate?

- Data type (e.g., number, string, boolean).

- Value range or format (e.g., 1–20, valid email).

- Presence (non-empty, required fields).

- Structure (e.g., JSON shape, array length).




## How to validate?

- Write functions or methods that accept input and return whether it’s valid.

- Use clear rules and conditions tailored to expected data.

- Optionally provide error messages or codes for feedback.

- Benefits of validation:

- Improves user experience by catching errors early.

- Prevents bugs and crashes caused by bad data.

- Enhances security by filtering harmful input.

- Supports data consistency across your application.



## Summary
> Validation is the essential step of verifying data against defined rules to ensure correctness and safety before use.



## What to validate & examples:

1. Type Validation

```js

function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

```




2. Presence / Non-empty


```js

function isNotEmpty(str) {
  return typeof str === 'string' && str.trim() !== '';
}

```



3. Range Check

```js

function isInRange(num, min, max) {
  return num >= min && num <= max;
}

```


4. Format Check (e.g email etc..)


```js

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


```

5. Structure/Shape (e.g, API Response)


```js

function isValidUser(obj) {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}


```


How to combine validation:


```js


function validateUserInput(input) {
  if (!isNotEmpty(input.username)) return false;
  if (!isValidEmail(input.email)) return false;
  if (!isInRange(input.age, 1, 120)) return false;
  return true;
}


```


# Benefits

1. Prevent errors/crashes

2. Improve UX by early feedback

3. Enhance security

4. Keep data consistent

