/**
 * 주어진 수를 특정 범위를 벗어나지 않는 정수로 반올림합니다.
 * @param value 변환할 값
 * @param min 최솟값. 기본값은 `-Infinity`
 * @param max 최댓값. 기본값은 `Infinity`
 * @returns number
 */
const clip = (value: number, min = -Infinity, max = Infinity) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.min(Math.max(minInt, Math.round(value)), maxInt);
};

export default clip;
