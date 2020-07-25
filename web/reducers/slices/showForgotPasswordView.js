export default function showForgotPasswordView(state = false, action) {
    switch (action.type) {
      case 'SHOWFORGOTPASSWORDVIEW':
        return action.payload;
      default:
        return state;
    }
  }
  