export default function postCatSlug(state = '', action) {
    switch (action.type) {
        case 'UPDATEPOSTCATSLUG':
        return action.payload;
        default:
        return state;
    }
}
