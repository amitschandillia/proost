export default function openSubmitEmailDialog(state = null, action) {
  switch (action.type) {
    case 'OPENSUBMITEMAILDIALOG':
      return action.payload;
    default:
      return state;
  }
}
