const formatStreamsNumber = (num) => {
  if (num < 100000) return num.toString(); // 100k এর নিচে আসল নাম্বার

  //  Billion
  if (num >= 1000000000) {
    const billions = num / 1000000000;
    return billions % 1 === 0 ? `${billions.toFixed(0)} B` : `${billions.toFixed(1)} B+`;
  }

  // Million
  if (num >= 1000000) {
    const millions = num / 1000000;
    return millions % 1 === 0 ? `${millions.toFixed(0)} M` : `${millions.toFixed(1)} M+`;
  }

  //  Thousand (k)
  if (num >= 1000) {
    const thousands = num / 1000;
    return thousands % 1 === 0 ? `${thousands.toFixed(0)} K` : `${thousands.toFixed(1)} K+`;
  }

  return num;
};

export default formatStreamsNumber;


