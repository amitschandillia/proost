export default function userInfo(state = {}, action) {
  switch (action.type) {
    case 'ADDUSERINFO':
      return action.payload;
    default:
      return state;
  }
}
