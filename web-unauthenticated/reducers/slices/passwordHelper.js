export default function passwordHelper(state = 'Enter a secret password', action) {
  switch (action.type) {
    case 'CHANGEPASSHELPER':
      return action.payload;
    default:
      return state;
  }
}
