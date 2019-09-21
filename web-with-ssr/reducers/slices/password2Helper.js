export default function passwordHelper(state = 'Enter password again', action) {
  switch (action.type) {
    case 'CHANGEPASS2HELPER':
      return action.payload;
    default:
      return state;
  }
}
