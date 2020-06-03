const isPrime = (num: number) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num !== 1 && num !== 0;
};

export const checkPrimes = (iterations: number) => {
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
};
