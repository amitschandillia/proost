export default function sessID(state = '', action) {
  switch (action.type) {
    case 'ADDSESSION':
      return action.payload;
    default:
      return state;
  }
}
