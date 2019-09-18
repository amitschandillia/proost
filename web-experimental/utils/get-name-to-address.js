const getNameToAddress = (fn, ln, un) => {
  let nameToAddress;
  if (!fn || fn.length < 1) {
    if (!ln || ln.length < 1) {
      if (!un || un.length < 1) {
        nameToAddress = 'Guest';
      } else {
        nameToAddress = un;
      }
    } else {
      nameToAddress = ln;
    }
  } else {
    nameToAddress = fn;
  }
  return nameToAddress;
};

export default getNameToAddress;
