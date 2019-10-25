const getInitials = (fn, ln, un) => {
  let first = fn;
  let last = ln;
  let name;

  if (!fn || typeof fn === 'undefined') { first = ''; }
  if (!ln || typeof ln === 'undefined') { last = ''; }
  name = `${first} ${last}`;
  name = name.trim();
  if (name.length < 1) { name = un; }

  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export default getInitials;
