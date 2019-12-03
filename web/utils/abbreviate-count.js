const abbreviateCount = (num, precision) => {
  const whole = Math.round(num);
  const digits = whole.toString().length;
  let value;
  let divisor;
  let suffix;

  if (digits < 4) {
    value = whole;
  } else if (digits < 7) {
    divisor = 10 ** 3;
    suffix = 'k';
  } else if (digits < 10) {
    divisor = 10 ** 6;
    suffix = 'm';
  } else if (digits < 13) {
    divisor = 10 ** 9;
    suffix = 'b';
  } else if (digits < 16) {
    divisor = 10 ** 12;
    suffix = 't';
  }
  value = Math.round((whole / divisor) * (10 ** precision)) / (10 ** precision);

  if (digits < 4) {
    value = whole;
  } else {
    value += suffix;
  }

  return value;
};

export default abbreviateCount;
