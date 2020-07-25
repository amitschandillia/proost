export default function postViews(state = 0, action) {
    switch (action.type) {
      case 'UPDATEPOSTVIEWS':
        return action.payload;
      default:
        return state;
    }
  }
    