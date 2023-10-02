/**
 * 주어진 값이 숫자 자료형이면 px을 붙인 문자열을 반환합니다.
 * @param value CSS에 들어갈 어떤 값
 * @returns string
 */
const toPixelIfNumber = (value: string | number) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

export default toPixelIfNumber;
