export default function blogMenu(state = false, action) {
  switch (action.type) {
    case 'OPENBLOGMENU':
      return action.payload;
    default:
      return state;
  }
}
