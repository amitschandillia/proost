export default function postsLiked(state = [], action) {
    switch (action.type) {
      case 'CHANGELIKEDPOSTS':
        // console.log('...action.payload', ...action.payload);
        // return [...action.payload];
        return 'sample';
      default:
        return state;
    }
  }
