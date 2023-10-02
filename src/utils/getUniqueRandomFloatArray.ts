/**
 * 0 이상 1 미만인 무작위 실수값의 배열을 반환합니다. 배열의 각 숫자끼리 겹치지 않습니다.
 * @param length 배열의 길이
 * @returns 서로 다른 0 이상 1 미만의 무작위 실수가 들어 있는 배열
 */
const getUniqueRandomFloatArray = (length: number) => {
  const numbers = new Set<number>();
  while (numbers.size < length) {
    numbers.add(Math.random());
  }
  return Array.from(numbers);
};

export default getUniqueRandomFloatArray;
