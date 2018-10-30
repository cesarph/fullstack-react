import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import uuid from 'uuid';
import './App.css';

const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
});

// function reducer(state = {}, action) {
//   return {
//     activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
//     threads: threadsReducer(state.threads, action),
//   }
// }

function activeThreadIdReducer(state = '1-fca2', action) {
  if (action.type === 'OPEN_THREAD') {
    return action.id;
  } else {
    return state;
  }
}

function threadsReducer(state = [
  {
    id: '1-fca2',
    title: 'Buzz Aldrin',
    messages: messageReducer(undefined, {})
  },
  {
    id: '2-be91',
    title: 'Michael Collins',
    messages: messageReducer(undefined, {}),
  }
], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      const threadIndex = findThreadIndex(state, action);

      const oldThread = state[threadIndex];
      const newThread = {
        ...oldThread, 
        messages: messageReducer(oldThread.messages, action),
      };

      return [
        ...state.slice(0, threadIndex),
        newThread, 
        ...state.slice(threadIndex + 1, state.length),
      ];
    }
    default: {
      return state;
    }
  }
}

function messageReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage = {
        text: action.text,
        timestamp: Date.now(),
        id: uuid.v4(),
      };
  
      return state.concat(newMessage);
    }
    case 'DELETE_MESSAGE': {
      return state.filter(message => message.id !== action.id);
    }
    default: {
      return state;
    }
  }  
}

function findThreadIndex(threads, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return threads.findIndex(
        (thread) => thread.id === action.threadId
      );
    }
    case 'DELETE_MESSAGE': {
      return threads.findIndex(
        (thread) => thread.messages.find((message) => (
          message.id === action.id
        ))
      );
    }
    default: {
      return threads;
    }
  }
}

// const initialState = {
//   activeThreadId: '1-fca2',
//   threads: [
//     {
//       id: '1-fca2',
//       title: 'Buzz Aldrin',
//       messages: [
//         {
//           text: 'Twelve minutes to ignition',
//           timestamp: Date.now(),
//           id: uuid.v4(),
//         },
//       ]
//     },
//     {
//       id: '2-be91',
//       title: 'Michael Collins',
//       messages: [],
//     },
//   ],
// };

const store = createStore(reducer);

function deleteMessage(id) { 
  return { 
    type: 'DELETE_MESSAGE', 
    id: id, 
  }; 
}

function addMessage(text, threadId) { 
  return { 
    type: 'ADD_MESSAGE', 
    text: text, 
    threadId: threadId, 
  }; 
}

function openThread(id) { 
  return { 
    type: 'OPEN_THREAD', 
    id: id, 
  }; 
}



const App = () => (
  <div className="ui segment">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
);

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const mapStateToTabsProps = (state) => {
  const tabs = state.threads.map(thread => (
    {
      title: thread.title,
      active: thread.id === state.activeThreadId,
      id: thread.id,
    }
  ));

  return {
    tabs,
  };
};

const mapDispatchToTabsProps = (dispatch) => (
  {
    onClick: (id) => (
      store.dispatch(openThread(id))
    ),
  }
);


const Tabs = (props) => (
  <div className="ui top attached tabular menu">
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active ? 'active item' : 'item'}
          onClick={() => props.onClick(tab.id)}
        >
         {tab.title}
       </div>
      ))
    }
  </div>
);

const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs);

class TextFieldSubmit extends Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
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

const MessageList = (props) => (
  <div className="ui comments">
  {
    props.messages.map((message, index) => (
      <div 
        className="comment"
        key={index}
        onClick={() => props.onClick(message.id)}
      >
      <div className="text">
        {message.text}
        <span className="metadata">@{message.timestamp}</span>
      </div>
    </div>
    ))
  }
  </div>
)

const Thread = (props) => (
  <div className="ui center aligned basic segment">
    <MessageList
      messages={props.thread.messages}
      onClick={props.onMessageClick}
    />
    <TextFieldSubmit
      onSubmit={props.onMessageSubmit}
    />
  </div>

)

const mapStateToThreadProps = (state) => (
  {
    thread: state.threads.find(
      thread => thread.id === state.activeThreadId
    )
  }
);

const mapDispatchToThreadProps = (dispatch) => (
  {
    onMessageClick: (id) => {
      store.dispatch(deleteMessage(id));
    },
    dispatch: dispatch,

  }
);

const mergeThreadProps = (stateProps, dispatchProps) => (
  {
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) => {
      dispatchProps.dispatch(addMessage(text, stateProps.thread.id));
    }
  }
);

const ThreadDisplay = connect(
  mapStateToThreadProps, 
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread);

export default WrappedApp;
