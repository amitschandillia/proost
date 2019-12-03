export default function dbError(state = false, action) {
  switch (action.type) {
    case 'TOGGLEDBERROR':
      return action.payload;
    default:
      return state;
  }
}
