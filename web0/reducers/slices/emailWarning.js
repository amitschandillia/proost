export default function emailWarning(state = 0, action) {
  switch (action.type) {
    case 'WARNFOREXISTINGEMAIL':
      return action.payload;
    default:
      return state;
  }
}
