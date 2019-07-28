import { createStore } from 'redux';

const reducer = (state = { userData: '' }, action) => {
  switch (action.type) {
    case 'ADDUSER':
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

const makeStore = initialState => createStore(reducer, initialState);

export default makeStore;
