import styled, { css, keyframes } from 'styled-components';

type StackWrapperProps = {
  $flow: 'normal' | 'reverse';
  $showCount: number;
  $newChildHeight: React.CSSProperties['height'];
  $animationTime: number;
  $justifyItems: React.CSSProperties['justifyItems'];
};

const appear = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const rise = (height: StackWrapperProps['$newChildHeight']) => keyframes`
  from { transform: translate3d(0, ${height}, 0) }
  to { transform: translate3d(0, 0, 0) }
`;

const fall = (height: StackWrapperProps['$newChildHeight']) => keyframes`
  from { transform: translate3d(0, calc(-1 * ${height}), 0) }
  to { transform: translate3d(0, 0, 0) }
`;

const firstChildAnimation = css<Pick<StackWrapperProps, '$newChildHeight' | '$animationTime'>>`
  & > *:first-child {
    animation: ${appear} ${({ $animationTime }) => $animationTime}s linear;
  }
`;

const lastChildAnimation = css<Pick<StackWrapperProps, '$newChildHeight' | '$animationTime'>>`
  & > *:last-child {
    animation:
      ${({ $newChildHeight }) => rise($newChildHeight)} ${({ $animationTime }) => $animationTime}s
        linear,
      ${appear} ${({ $animationTime }) => $animationTime}s linear;
  }
`;

export const Wrapper = styled.div<StackWrapperProps>`
  display: grid;
  row-gap: 10px;
  justify-items: ${({ $justifyItems }) => $justifyItems};

  width: 100%;

  animation-name: ${({ $newChildHeight, $flow }) =>
    $flow === 'reverse' ? fall($newChildHeight) : ''};
  animation-duration: ${({ $animationTime }) => $animationTime}s;
  animation-timing-function: linear;

  ${({ $flow }) => ($flow === 'normal' ? lastChildAnimation : firstChildAnimation)}
`;
