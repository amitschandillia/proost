export default function profileMenuAnchorEl(state = null, action) {
  switch (action.type) {
    case 'CHANGEPROFILEMENUANCHOREL':
      return action.payload;
    default:
      return state;
  }
}
