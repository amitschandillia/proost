export default function postCatName(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTCATNAME':
        return action.payload;
        default:
        return state;
    }
}
