export default function usernameError(state = false, action) {
  switch (action.type) {
    case 'TOGGLEUNERROR':
      return action.payload;
    default:
      return state;
  }
}
