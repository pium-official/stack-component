import { Children, useRef, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Wrapper } from './Stack.style';
import clip from '../utils/clip';

type StackProps = {
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
   * @defaultValue 'normal'
   */
  flow?: 'normal' | 'reverse';
  /**
   * 각 요소를 정렬할 방향
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
   * 보여줄 요소의 개수. 음이 아닌 정수여야 합니다.
   *
   * 음수는 0으로, 실수는 소수 첫째 자리에서 반올림하여 사용합니다.
   */
  showCount: number;
};

const Container = (props: React.PropsWithChildren<StackProps>) => {
  const { as: tag = 'div', time = 400, showCount, children } = props;

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

  return (
    <Wrapper
      ref={container}
      as={tag}
      $showCount={clippedShowCount}
      $newChildHeight={`${height.current - height.previous + Math.random()}px`}
      $animationTime={animationTime}
    >
      {Children.toArray(children).slice(0, clippedShowCount).reverse()}
    </Wrapper>
  );
};

export default Container;
