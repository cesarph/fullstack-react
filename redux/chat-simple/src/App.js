import React, { Component } from 'react';

import './App.css';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return {
        messages: state.messages.concat(action.message),
      };
    case 'DELETE_MESSAGE':
      return {
        // messages: [
        //   ...state.messages.slice(0, action.index),
        //   ...state.messages.slice(action.index + 1, state.messages.length)
        // ]
        messages: state.messages.filter((message, i) => i !== action.index),
      };
    default:
      return state;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  }
}

const initialState = {
  messages: [],
};

const store = createStore(reducer, initialState);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div className="ui segment">
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

class MessageInput extends Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.state.value,
    });
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className="ui input">
        <input 
          onChange={this.onChange}
          value={this.state.value}
          type="text"
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit' 
        >
         Submit
        </button>
      </div>
    )
  }
}

class MessageView extends Component {
  handleClick = (index) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index,
    });
  };
  
  render() {
    const messages = this.props.messages.map((message, index) => (
      <div 
        className="comment"
        key={index}
        onClick={() => this.handleClick(index)}
      >
        {message}
      </div>
    ));
    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}

export default App;