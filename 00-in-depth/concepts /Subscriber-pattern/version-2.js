



const listeners = new Set();

export const subscribe = (listner) => listeners.add(listner);
export const unsubscribe = (listener) => listeners.delete(listener);


const notify = function() {
  listeners.forEach(listener => listener(_state));
}
