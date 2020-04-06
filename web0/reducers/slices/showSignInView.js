export default function showSignInView(state = true, action) {
  switch (action.type) {
    case 'SHOWSIGNINVIEW':
      return action.payload;
    default:
      return state;
  }
}
