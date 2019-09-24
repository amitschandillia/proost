export default function usernameHelper(state = 'Your username of choice', action) {
  switch (action.type) {
    case 'CHANGEUNHELPER':
      return action.payload;
    default:
      return state;
  }
}
