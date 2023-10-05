import { Children, useRef, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Wrapper } from './Stack.style';
import clip from '../utils/clip';
import toPixelIfNumber from '../utils/toPixelIfNumber';
import getUniqueRandomFloatArray from '../utils/getUniqueRandomFloatArray';

type StackProps = {
  /**
   * 보여줄 요소의 개수. 음이 아닌 정수여야 합니다.
   *
   * 음수는 0으로, 실수는 소수 첫째 자리에서 반올림하여 사용합니다.
   */
  showCount: number;
  /**
   * Stack에 적용할 semantic tag
   * @defaultValue 'div'
   */
  as?: 'div' | 'ul' | 'ol' | 'main' | 'section' | 'article';
  /**
   * 쌓이는 방향.
   *
   * `normal`: JSX에 나타난 순서대로 DOM에 표시됩니다. 새로운 요소는 아래에서 위로 올라옵니다.
   *
   * `reverse`: JSX에 나타난 순서의 반대로 DOM에 표시됩니다. 새로운 요소는 위에서 아래로 떨어집니다.
   * @defaultValue 'reverse'
   */
  flow?: 'normal' | 'reverse';
  /**
   * 각 요소를 정렬할 방향.
   * @defaultValue 'normal'
   */
  justifyItems?: React.CSSProperties['justifyItems'];
  /**
   * 새로운 요소가 생길 때 애니메이션 시간(밀리초). 음이 아닌 정수여야 합니다.
   *
   * 음수는 0으로, 실수는 소수 첫째 자리에서 반올림하여 사용합니다.
   * @defaultValue 400
   */
  time?: number;
  /**
   * 내부 요소들 사이의 간격.
   * @defaultValue 0
   */
  rowGap?: React.CSSProperties['rowGap'];
};

/**
 * 자식 요소들이 연속해서 같은 높이를 가지는 경우 `$newChildHeight`에 변화가 없기 때문에
 * css 애니메이션의 이름이 변하지 않습니다.
 * 따라서 html 역시 이미 실행한 애니메이션이라고 판단,
 * 맨 처음 1회만 애니메이션을 실행하는 문제 해결을 위한 코드입니다.
 *
 * 배열의 길이는 2로도 가능하지만, 피움은 일곱 명이라 7로 했습니다.
 * @see https://github.com/pium-official/stack-component/pull/2#pullrequestreview-1656634631
 */
const randomOffsets = getUniqueRandomFloatArray(7);

const Stack = (props: React.PropsWithChildren<StackProps>) => {
  const {
    as: tag = 'div',
    time = 400,
    justifyItems = 'normal',
    flow = 'reverse',
    rowGap = 0,
    showCount,
    children,
  } = props;

  const container = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState({ previous: 0, current: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const [self] = entries;
      const { height: resizedHeight } = self.target.getBoundingClientRect();
      flushSync(() => setHeight(({ current }) => ({ previous: current, current: resizedHeight })));
    });

    if (container.current) resizeObserver.observe(container.current);
    return () => resizeObserver.disconnect();
  }, []);

  const clippedShowCount = clip(showCount, 0);
  const animationTime = clip(time, 0) / 1000;
  const visibleChildren = Children.toArray(children).slice(0, clippedShowCount);
  const animationOffset = randomOffsets[showCount % 7];

  return (
    <Wrapper
      ref={container}
      as={tag}
      $flow={flow}
      $showCount={clippedShowCount}
      $newChildHeight={`${height.current - height.previous + animationOffset}px`}
      $animationTime={animationTime}
      $justifyItems={justifyItems}
      $rowGap={toPixelIfNumber(rowGap)}
    >
      {flow === 'normal' ? visibleChildren : visibleChildren.reverse()}
    </Wrapper>
  );
};

export default Stack;
