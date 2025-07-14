


const listeners = [];


export const subscribe = function(listener) {
  listeners.push(listener);
}

const notify = function() {
  listeners.forEach((listener) => listener(_state));
}


notify();

