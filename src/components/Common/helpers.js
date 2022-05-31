export const impactProp = (value) => {
  let impact = Array.from({ length: value > 10 ? value / 10 : 1 }, (_, i) =>
    value > 10 ? (i + 1) * 10 : value
  );
  return value % 10 !== 0 && value > 10 ? [...impact, value] : impact;
};
