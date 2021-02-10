/**
 * Trancate after divide remainer.
 *
 * divide two numbers and truncate for near zero
 * @param n1
 * @param n2
 */
export const truncateDivide = (n1: number, n2: number): number => {
  if (Math.abs(n2) === 0 || isNaN(n2)) {
    throw new RangeError("RangeError when divide by n2");
  }

  const result = Math.trunc(n1 / n2);
  // Deno test 0 is not -0 :(
  if (result == 0) {
    return Math.abs(0);
  }
  return result;
};
