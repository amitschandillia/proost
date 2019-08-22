import { createStore } from 'redux';

const reducer = (state = {
  userToken: '',
  userInfo: {},
  sessID: '',
  openSignInDialog: false,
  showSignInView: true,
  showSignUpView: false,
  flagEmailError: false,
  emailWarning: 0,
  firstNameError: false,
  lastNameError: false,
  usernameError: false,
  passwordError: false,
  passwordErrorSignIn: false,
  password2Error: false,
  dbError: false,
  credentialsErrorDisplay: 'none',
  registered: null,
  firstNameHelper: 'Your first name',
  lastNameHelper: 'Your last name',
  usernameHelper: 'Your username of choice',
  passwordHelper: 'Enter a secret password',
  password2Helper: 'Enter password again',
}, action) => {
  switch (action.type) {
    case 'ADDUSERTOKEN':
      return { ...state, userToken: action.payload };
    case 'ADDUSERINFO':
      return { ...state, userInfo: action.payload };
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
    case 'FLAGCREDENTIALSERROR':
      return { ...state, credentialsErrorDisplay: action.payload };
    case 'FLAGEMAILERROR':
      return { ...state, flagEmailError: action.payload };
    case 'FLAGPASSWORDERROR':
      return { ...state, passwordErrorSignIn: action.payload };
    case 'WARNFOREXISTINGEMAIL':
      return { ...state, emailWarning: action.payload };
    case 'CHANGEFNHELPER':
      return { ...state, firstNameHelper: action.payload };
    case 'CHANGELNHELPER':
      return { ...state, lastNameHelper: action.payload };
    case 'CHANGEUNHELPER':
      return { ...state, usernameHelper: action.payload };
    case 'CHANGEPASSHELPER':
      return { ...state, passwordHelper: action.payload };
    case 'CHANGEPASS2HELPER':
      return { ...state, password2Helper: action.payload };
    case 'TOGGLEFNERROR':
      return { ...state, firstNameError: action.payload };
    case 'TOGGLELNERROR':
      return { ...state, lastNameError: action.payload };
    case 'TOGGLEUNERROR':
      return { ...state, usernameError: action.payload };
    case 'TOGGLEPASSERROR':
      return { ...state, passwordError: action.payload };
    case 'TOGGLEPASS2ERROR':
      return { ...state, password2Error: action.payload };
    case 'TOGGLEDBERROR':
      return { ...state, dbError: action.payload };
    case 'UPDATEREGISTEREDUSER':
      return { ...state, registered: action.payload };
    default:
      return state;
  }
};

const makeStore = initialState => createStore(reducer, initialState);

export default makeStore;
