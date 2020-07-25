export default function postAuthorUN(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTAUTHORUN':
        return action.payload;
        default:
        return state;
    }
}
