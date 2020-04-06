export default function password2Error(state = false, action) {
  switch (action.type) {
    case 'TOGGLEPASS2ERROR':
      return action.payload;
    default:
      return state;
  }
}
