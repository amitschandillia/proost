export default function postAuthorFN(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTAUTHORFN':
        return action.payload;
        default:
        return state;
    }
}
