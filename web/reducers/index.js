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
import language from './slices/language';
import lastNameError from './slices/lastNameError';
import lastNameHelper from './slices/lastNameHelper';
import openSignInDialog from './slices/openSignInDialog';
import openSubmitEmailDialog from './slices/openSubmitEmailDialog';
import password2Error from './slices/password2Error';
import password2Helper from './slices/password2Helper';
import passwordError from './slices/passwordError';
import passwordErrorSignIn from './slices/passwordErrorSignIn';
import passwordHelper from './slices/passwordHelper';
import postAuthorFN from './slices/postAuthorFN';
import postAuthorLN from './slices/postAuthorLN';
import postAuthorThumbnail from './slices/postAuthorThumbnail';
import postAuthorUN from './slices/postAuthorUN';
import postBanner from './slices/postBanner';
import postCatName from './slices/postCatName';
import postCatSlug from './slices/postCatSlug';
import postReadTime from './slices/postReadTime';
import postSecondaryTitle from './slices/postSecondaryTitle';
import postTags from './slices/postTags';
import postTitle from './slices/postTitle';
import postViews from './slices/postViews';
import profileMenu from './slices/profileMenu';
import profileMenuAnchorEl from './slices/profileMenuAnchorEl';
import registered from './slices/registered';
import sessID from './slices/sessID';
import showFlagsDialog from './slices/showFlagsDialog';
import showForgotPasswordView from './slices/showForgotPasswordView';
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
  language,
  lastNameError,
  lastNameHelper,
  openSignInDialog,
  openSubmitEmailDialog,
  password2Error,
  password2Helper,
  passwordError,
  passwordErrorSignIn,
  passwordHelper,
  postAuthorFN,
  postAuthorLN,
  postAuthorThumbnail,
  postAuthorUN,
  postBanner,
  postCatName,
  postCatSlug,
  postReadTime,
  postSecondaryTitle,
  postTags,
  postTitle,
  postViews,
  profileMenu,
  profileMenuAnchorEl,
  registered,
  sessID,
  showFlagsDialog,
  showForgotPasswordView,
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
