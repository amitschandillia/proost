export default function postAuthorLN(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTAUTHORLN':
        return action.payload;
        default:
        return state;
    }
}
