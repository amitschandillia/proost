export default function showFlagsDialog(state = null, action) {
  switch (action.type) {
    case 'SHOWFLAGSDIALOG':
      return action.payload;
    default:
      return state;
  }
}
