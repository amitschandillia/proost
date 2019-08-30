import { createStore, combineReducers } from 'redux';
import blogMenu from './slice-reducers/blogMenu';
import blogMenuAnchorEl from './slice-reducers/blogMenuAnchorEl';
import credentialsErrorDisplay from './slice-reducers/credentialsErrorDisplay';
import dbError from './slice-reducers/dbError';
import emailWarning from './slice-reducers/emailWarning';
import firstNameError from './slice-reducers/firstNameError';
import firstNameHelper from './slice-reducers/firstNameHelper';
import flagEmailError from './slice-reducers/flagEmailError';
import lastNameError from './slice-reducers/lastNameError';
import lastNameHelper from './slice-reducers/lastNameHelper';
import openSignInDialog from './slice-reducers/openSignInDialog';
import openSubmitEmailDialog from './slice-reducers/openSubmitEmailDialog';
import password2Error from './slice-reducers/password2Error';
import password2Helper from './slice-reducers/password2Helper';
import passwordError from './slice-reducers/passwordError';
import passwordErrorSignIn from './slice-reducers/passwordErrorSignIn';
import passwordHelper from './slice-reducers/passwordHelper';
import profileMenu from './slice-reducers/profileMenu';
import profileMenuAnchorEl from './slice-reducers/profileMenuAnchorEl';
import registered from './slice-reducers/registered';
import sessID from './slice-reducers/sessID';
import showSignInView from './slice-reducers/showSignInView';
import showSignUpView from './slice-reducers/showSignUpView';
import toolsMenu from './slice-reducers/toolsMenu';
import toolsMenuAnchorEl from './slice-reducers/toolsMenuAnchorEl';
import userInfo from './slice-reducers/userInfo';
import usernameError from './slice-reducers/usernameError';
import usernameHelper from './slice-reducers/usernameHelper';

const reducerStore = combineReducers({
  blogMenu,
  blogMenuAnchorEl,
  credentialsErrorDisplay,
  dbError,
  emailWarning,
  firstNameError,
  firstNameHelper,
  flagEmailError,
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
