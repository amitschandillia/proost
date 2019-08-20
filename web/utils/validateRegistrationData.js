import validator from 'validator';
import passwordValidator from 'password-validator';

const schema = new passwordValidator();

const nameMax = 50;
const unameMin = 6;
const passMin = 6;

schema
.is().min(passMin)
.has().uppercase()
.has().lowercase()
.has().digits()
.is().not().oneOf(['Passw0rd', 'Password123']);


const capitalize = text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const isValidName = (name) => {
  let letters = `a-zA-Z`;
  letters += `àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž`;
  letters += `ÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð`;
  const re = new RegExp(`^(?!.*[ ,'’]$)(?![ .,'’])[${letters} ,.'’-]+$`, 'u');
  return(name.match(re));
};

export const validateName = (name, type = 'first') => {
  let nameValidationText;
  let nameValidationError = true;
  if(validator.isEmpty(name)) {
    nameValidationText = `Do not leave ${type} name empty!`;
  } else if(!validator.isLength(name, {min:0, max: nameMax})) {
    nameValidationText = `${capitalize(type)} name must not exceed ${nameMax} characters!`;
  } else if(!isValidName(name)) {
    nameValidationText = `Doesn't look like a valid ${type} name!`;
  } else {
    nameValidationText = `Your ${type} name`;
    nameValidationError = false;
  }
  return {nameValidationText, nameValidationError};
};

export const validateUsername = (username) => {
  let usernameValidationText;
  let usernameValidationError = true;
  if(validator.isEmpty(username)) {
    usernameValidationText = `Do not leave username empty!`;
  } else if(!validator.isLength(username, {min:unameMin})) {
    usernameValidationText = `Make it at least ${unameMin} characters`;
  } else if(!validator.isAlphanumeric(username)) {
    usernameValidationText = `No special characters in username!`;
  } else if(!validator.isAlpha(username.charAt(0))) {
    usernameValidationText = `Username must start with a letter`;
  } else {
    usernameValidationText = `Your username of choice`;
    usernameValidationError = false;
  }
  return {usernameValidationText, usernameValidationError};
};

export const validatePassword = (password, compareWith = null) => {
  let passwordValidationText;
  let passwordValidationError = true;
  if(compareWith) {
    if(!validator.equals(password, compareWith)) {
      passwordValidationText = `The two passwords do not match`;
    } else {
      passwordValidationText = `Enter password again`;
      passwordValidationError = false;
    }
  } else {
    const passwordErrors = schema.validate(password, { list: true });
    if(passwordErrors.length > 0) {
      if(passwordErrors.includes('min')) {
        passwordValidationText = `Make it at least ${passMin} characters`;
      } else if(passwordErrors.includes('uppercase')) {
        passwordValidationText = `Must include at least 1 uppercase letter`;
      } else if(passwordErrors.includes('lowercase')) {
        passwordValidationText = `Must include at least 1 lowercase letter`;
      } else if(passwordErrors.includes('digits')) {
        passwordValidationText = `Must include at least 1 number`;
      } else if(passwordErrors.includes('oneOf')) {
        passwordValidationText = `Please try a safer password`;
      }
    } else {
      passwordValidationText = `Enter a secret password`;
      passwordValidationError = false;
    }
  }
  return {passwordValidationText, passwordValidationError};
}
