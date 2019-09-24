export default function profileMenu(state = false, action) {
  switch (action.type) {
    case 'OPENPROFILEMENU':
      return action.payload;
    default:
      return state;
  }
}
