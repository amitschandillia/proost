export default function ip(state = '', action) {
  switch (action.type) {
    case 'UPDATEIP':
      return action.payload;
    default:
      return state;
  }
}
