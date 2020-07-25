export default function postSecondaryTitle(state = '', action) {
    switch (action.type) {
      case 'UPDATEPOSTSECONDARYTITLE':
        return action.payload;
      default:
        return state;
    }
  }
    