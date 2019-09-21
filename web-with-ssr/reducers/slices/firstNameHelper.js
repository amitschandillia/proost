export default function firstNameHelper(state = 'Your first name', action) {
  switch (action.type) {
    case 'CHANGEFNHELPER':
      return action.payload;
    default:
      return state;
  }
}
