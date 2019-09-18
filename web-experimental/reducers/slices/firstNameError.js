export default function firstNameError(state = false, action) {
  switch (action.type) {
    case 'TOGGLEFNERROR':
      return action.payload;
    default:
      return state;
  }
}
