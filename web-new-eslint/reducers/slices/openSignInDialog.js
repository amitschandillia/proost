export default function openSignInDialog(state = false, action) {
  switch (action.type) {
    case 'OPENSIGNINDIALOG':
      return action.payload;
    default:
      return state;
  }
}
