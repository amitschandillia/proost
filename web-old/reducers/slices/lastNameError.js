export default function lastNameError(state = false, action) {
  switch (action.type) {
    case 'TOGGLELNERROR':
      return action.payload;
    default:
      return state;
  }
}
