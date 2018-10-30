function reducer(state, action) {
  if(action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}

const incrementAction = { 
  type: 'INCREMENT',
  amount: 5, 
};

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));
console.log(reducer(5, incrementAction));

const unknownAction = { 
  type: 'UNKNOWN',
  amount: 8, 
};

console.log(reducer(15, unknownAction));
console.log(reducer(8, unknownAction));

const decrementAction = { 
  type: 'DECREMENT',
  amount: 11, 
};

console.log(reducer(100, decrementAction));
console.log(reducer(90, decrementAction));
console.log(reducer(25, decrementAction));
