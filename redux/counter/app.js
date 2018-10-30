function reducer(state, action) {
  if(action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

const incrementAction = { type: 'INCREMENT' };

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));
console.log(reducer(5, incrementAction));

const unknownAction = { type: 'UNKNOWN' };

console.log(reducer(5, unknownAction));
console.log(reducer(8, unknownAction));

const decrementAction = { type: 'DECREMENT' };

console.log(reducer(10, decrementAction));
console.log(reducer(9, decrementAction));
console.log(reducer(5, decrementAction));
