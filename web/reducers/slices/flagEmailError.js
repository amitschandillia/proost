export default function flagEmailError(state = false, action) {
  switch (action.type) {
    case 'FLAGEMAILERROR':
      return action.payload;
    default:
      return state;
  }
}
