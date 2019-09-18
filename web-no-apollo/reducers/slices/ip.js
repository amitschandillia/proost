export default function ip(state = null, action) {
  switch (action.type) {
    case 'UPDATEIP':
      return action.payload;
    default:
      return state;
  }
}
