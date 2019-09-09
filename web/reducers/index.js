import { createStore, combineReducers } from 'redux';
import blogMenu from './slices/blogMenu';
import blogMenuAnchorEl from './slices/blogMenuAnchorEl';
import credentialsErrorDisplay from './slices/credentialsErrorDisplay';
import dbError from './slices/dbError';
import emailWarning from './slices/emailWarning';
import firstNameError from './slices/firstNameError';
import firstNameHelper from './slices/firstNameHelper';
import flagEmailError from './slices/flagEmailError';
import ip from './slices/ip';
import lastNameError from './slices/lastNameError';
import lastNameHelper from './slices/lastNameHelper';
import openSignInDialog from './slices/openSignInDialog';
import openSubmitEmailDialog from './slices/openSubmitEmailDialog';
import password2Error from './slices/password2Error';
import password2Helper from './slices/password2Helper';
import passwordError from './slices/passwordError';
import passwordErrorSignIn from './slices/passwordErrorSignIn';
import passwordHelper from './slices/passwordHelper';
import profileMenu from './slices/profileMenu';
import profileMenuAnchorEl from './slices/profileMenuAnchorEl';
import registered from './slices/registered';
import sessID from './slices/sessID';
import showSignInView from './slices/showSignInView';
import showSignUpView from './slices/showSignUpView';
import toolsMenu from './slices/toolsMenu';
import toolsMenuAnchorEl from './slices/toolsMenuAnchorEl';
import userInfo from './slices/userInfo';
import usernameError from './slices/usernameError';
import usernameHelper from './slices/usernameHelper';

const reducerStore = combineReducers({
  blogMenu,
  blogMenuAnchorEl,
  credentialsErrorDisplay,
  dbError,
  emailWarning,
  firstNameError,
  firstNameHelper,
  flagEmailError,
  ip,
  lastNameError,
  lastNameHelper,
  openSignInDialog,
  openSubmitEmailDialog,
  password2Error,
  password2Helper,
  passwordError,
  passwordErrorSignIn,
  passwordHelper,
  profileMenu,
  profileMenuAnchorEl,
  registered,
  sessID,
  showSignInView,
  showSignUpView,
  toolsMenu,
  toolsMenuAnchorEl,
  userInfo,
  usernameError,
  usernameHelper,
});

const makeStore = (initialState) => createStore(reducerStore, initialState);

export default makeStore;
