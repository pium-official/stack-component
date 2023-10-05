declare type StackProps = {
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

declare const Stack: (props: React.PropsWithChildren<StackProps>) => JSX.Element;

export { Stack };
