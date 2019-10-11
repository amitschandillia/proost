export default function toolsMenuAnchorEl(state = null, action) {
  switch (action.type) {
    case 'CHANGETOOLSMENUANCHOREL':
      return action.payload;
    default:
      return state;
  }
}
