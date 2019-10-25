export default function lastNameHelper(state = 'Your last name', action) {
  switch (action.type) {
    case 'CHANGELNHELPER':
      return action.payload;
    default:
      return state;
  }
}
