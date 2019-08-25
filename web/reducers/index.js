import { createStore, combineReducers } from 'redux';
import userInfo from './reducers/userInfo';
import sessID from './reducers/sessID';
import openSignInDialog from './reducers/openSignInDialog';
import openSubmitEmailDialog from './reducers/openSubmitEmailDialog';
import showSignInView from './reducers/showSignInView';
import showSignUpView from './reducers/showSignUpView';
import flagEmailError from './reducers/flagEmailError';
import emailWarning from './reducers/emailWarning';
import firstNameError from './reducers/firstNameError';
import lastNameError from './reducers/lastNameError';
import usernameError from './reducers/usernameError';
import passwordError from './reducers/passwordError';
import passwordErrorSignIn from './reducers/passwordErrorSignIn';
import password2Error from './reducers/password2Error';
import dbError from './reducers/dbError';
import credentialsErrorDisplay from './reducers/credentialsErrorDisplay';
import registered from './reducers/registered';
import firstNameHelper from './reducers/firstNameHelper';
import lastNameHelper from './reducers/lastNameHelper';
import usernameHelper from './reducers/usernameHelper';
import passwordHelper from './reducers/passwordHelper';
import password2Helper from './reducers/password2Helper';

const reducerStore = combineReducers({
  userInfo,
  sessID,
  openSignInDialog,
  openSubmitEmailDialog,
  showSignInView,
  showSignUpView,
  flagEmailError,
  emailWarning,
  firstNameError,
  lastNameError,
  usernameError,
  passwordError,
  passwordErrorSignIn,
  password2Error,
  dbError,
  credentialsErrorDisplay,
  registered,
  firstNameHelper,
  lastNameHelper,
  usernameHelper,
  passwordHelper,
  password2Helper,
});

const makeStore = initialState => createStore(reducerStore, initialState);

export default makeStore;
