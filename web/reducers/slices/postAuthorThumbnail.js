export default function postAuthorThumbnail(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTAUTHORTHUMBNAIL':
        return action.payload;
        default:
        return state;
    }
}
