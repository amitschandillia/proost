import { createStore } from 'redux';

const reducer = (state = {
  userData: '',
  sessID: '',
  openSignInDialog: false,
  showSignInView: true,
  showSignUpView: false,
  flagEmailError: false,
  emailWarning: 0,
}, action) => {
  switch (action.type) {
    case 'ADDUSER':
      return { ...state, userData: action.payload };
    case 'ADDSESSION':
      return { ...state, sessID: action.payload };
    case 'OPENSIGNINDIALOG':
      return { ...state, openSignInDialog: action.payload };
    case 'SHOWSIGNINVIEW':
      return { ...state, showSignInView: action.payload };
    case 'SHOWSIGNUPVIEW':
      return { ...state, showSignUpView: action.payload };
    case 'OPENSUBMITEMAILDIALOG':
      return { ...state, openSubmitEmailDialog: action.payload };
    case 'FLAGEMAILERROR':
      return { ...state, flagEmailError: action.payload };
    case 'WARNFOREXISTINGEMAIL':
      return { ...state, emailWarning: action.payload };
    default:
      return state;
  }
};

const makeStore = initialState => createStore(reducer, initialState);

export default makeStore;
