export default function passwordError(state = false, action) {
  switch (action.type) {
    case 'TOGGLEPASSERROR':
      return action.payload;
    default:
      return state;
  }
}
