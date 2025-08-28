const formatStreamsNumber = (num) => {
  if (num < 100000) return num.toString(); // 100k এর নিচে আসল নাম্বার

  // বিলিয়ন
  if (num >= 1000000000) {
    const billions = Math.floor(num / 1000000000);
    return billions + (num % 1000000000 === 0 ? "b" : "b+");
  }

  // মিলিয়ন
  if (num >= 1000000) {
    const millions = Math.floor(num / 1000000);
    return millions + (num % 1000000 === 0 ? "m" : "m+");
  }

  // হাজার (k)
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    return thousands + (num % 1000 === 0 ? "k" : "k+");
  }

  return num;
};

export default formatStreamsNumber;
