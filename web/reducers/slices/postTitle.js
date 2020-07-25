export default function postTitle(state = '', action) {
  switch (action.type) {
    case 'UPDATEPOSTTITLE':
      return action.payload;
    default:
      return state;
  }
}
  