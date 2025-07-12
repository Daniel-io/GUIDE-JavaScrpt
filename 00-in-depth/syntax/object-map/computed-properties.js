/**
 
✅ Object key referencing with computed property names
Combined with a pattern called:

✅ Enum simulation (or enum-like pattern)

 */

const Status = {
  OK:    "ok",
  ERROR: "error",
  BUSY:  "busy",
};

const messages = {
  [Status.OK]:    "All systems go.",
  [Status.ERROR]: "Something went wrong!",
  [Status.BUSY]:  "Please wait a moment…",
};

console.log(messages.ok);    // "All systems go."
console.log(messages.error); // "Something went wrong!"




/**
 
Why use it?
Avoids repetitive conditional code.
Easy to update or extend reactions by just modifying the map.
Improves performance by O(1) key access instead of multiple condition checks.

 */