export default function toolsMenu(state = false, action) {
  switch (action.type) {
    case 'OPENTOOLSMENU':
      return action.payload;
    default:
      return state;
  }
}
