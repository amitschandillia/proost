export default function postBanner(state = '', action) {
    switch (action.type) {
      case 'UPDATEPOSTBANNER':
        return action.payload;
      default:
        return state;
    }
  }
    