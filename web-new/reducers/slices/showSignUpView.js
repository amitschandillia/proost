export default function showSignUpView(state = false, action) {
  switch (action.type) {
    case 'SHOWSIGNUPVIEW':
      return action.payload;
    default:
      return state;
  }
}
