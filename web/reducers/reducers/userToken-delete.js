export default function userToken(state = '', action) {
  switch (action.type) {
    case 'ADDUSERTOKEN':
      return action.payload;
    default:
      return state;
  }
}
