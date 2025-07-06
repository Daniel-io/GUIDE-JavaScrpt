


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