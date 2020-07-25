export default function postTags(state = null, action) {
    switch (action.type) {
        case 'UPDATEPOSTTAGS':
        return action.payload;
        default:
        return state;
    }
}
