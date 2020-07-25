export default function postReadTime(state = 0, action) {
    switch (action.type) {
      case 'UPDATEPOSTREADTIME':
        return action.payload;
      default:
        return state;
    }
  }
    