export default function credentialsErrorDisplay(state = 'none', action) {
  switch (action.type) {
    case 'FLAGCREDENTIALSERROR':
      return action.payload;
    default:
      return state;
  }
}
