import defaultDictionary from '../../dictionaries/en';

export default function language(state = defaultDictionary, action) {
  switch (action.type) {
    case 'SETLANGUAGE':
      return action.payload;
    default:
      return state;
  }
}
