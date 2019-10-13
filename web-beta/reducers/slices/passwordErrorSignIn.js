export default function passwordErrorSignIn(state = false, action) {
  switch (action.type) {
    case 'FLAGPASSWORDERROR':
      return action.payload;
    default:
      return state;
  }
}
