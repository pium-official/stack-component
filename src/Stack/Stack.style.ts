import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const fall = (height: React.CSSProperties['height']) => keyframes`
  from { transform: translate3d(0, calc(-1 * ${height}), 0) }
  to { transform: translate3d(0, 0, 0) }
`;

export const Wrapper = styled.div<{
  $showCount: number;
  $newChildHeight: React.CSSProperties['height'];
  $animationTime: number;
}>`
  display: grid;
  row-gap: 10px;
  width: 100%;
  animation: ${({ $newChildHeight }) => fall($newChildHeight)}
    ${({ $animationTime }) => $animationTime}s linear;

  & > *:first-child {
    animation: ${appear} ${({ $animationTime }) => $animationTime}s linear;
  }
`;
