# `Object.freeze()` + `const` — Summary

**Purpose:**  
Use `Object.freeze()` with `const` to create objects that are fully **immutable** and **non-reassignable**.

---

## ✅ Example

```js
const Status = Object.freeze({
  OK:    "ok",
  ERROR: "error",
  BUSY:  "busy",
});

```

🔒 Prevents

```js

Status.OK = "changed";     // ❌ Cannot change values
Status.NEW = "new";        // ❌ Cannot add properties
delete Status.BUSY;        // ❌ Cannot delete properties
Status = {};               // ❌ Cannot reassign (const)

```


🛠 Use When

You want to define constant values

You want to avoid accidental changes

You need a simple enum-like structure



✅ Just copy that into a `.md` file or Markdown editor and it will render nicely!

Let me know if you want a TypeScript version too!



