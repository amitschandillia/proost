export default function registered(state = null, action) {
  switch (action.type) {
    case 'UPDATEREGISTEREDUSER':
      return action.payload;
    default:
      return state;
  }
}
