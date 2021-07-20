import React from 'react';
import {
  Action, Dispatch, State, TodoProviderProps,
} from './types';

const TodoStateContext = React.createContext<
{ state: State; dispatch: Dispatch } | undefined
>(undefined);

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select': {
      return {
        ...state,
        selectedTodo: {
          ...action.payload,
        },
        openModal: true,
      };
    }
    case 'unselect': {
      return {
        ...state,
        selectedTodo: null,
        openModal: false,
      };
    }
    case 'open': {
      return {
        ...state,
        openModal: true,
      };
    }
    case 'close': {
      return {
        ...state,
        openModal: false,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}
function TodoProvider({ children }: TodoProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(todoReducer, {
    selectedTodo: null,
    openModal: false,
  });

  const value = { state, dispatch };
  return <TodoStateContext.Provider value={value}>{children}</TodoStateContext.Provider>;
}

function useTodo(): {
  state: State;
  dispatch: Dispatch;
} {
  const context = React.useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { TodoProvider, useTodo };
