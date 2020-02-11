export default function blogMenuAnchorEl(state = null, action) {
  switch (action.type) {
    case 'CHANGEBLOGMENUANCHOREL':
      return action.payload;
    default:
      return state;
  }
}
