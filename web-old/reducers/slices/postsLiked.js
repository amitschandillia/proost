export default function postsLiked(state = [], action) {
    switch (action.type) {
      case 'CHANGELIKEDPOSTS':
        return action.payload;
      default:
        return state;
    }
  }
  