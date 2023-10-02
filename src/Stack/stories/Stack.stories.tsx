import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Stack from '..';
import { POEMS } from './fixtures';

const meta: Meta<typeof Stack> = {
  component: Stack,

  argTypes: {
    as: { defaultValue: { summary: '"div"' } },
    flow: { defaultValue: { summary: '"reverse"' } },
    justifyItems: {
      table: { type: { detail: 'CSS의 `justify-items`' } },
      defaultValue: { summary: '"normal"' },
    },
    rowGap: {
      table: { type: { detail: 'CSS의 `row-gap`' } },
      defaultValue: { summary: '0' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const getRandomInteger = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min));
const getRandomColor = () => `hsl(${getRandomInteger(0, 360)}, 66%, 77%)`;

const RandomBox = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [height] = useState(getRandomInteger(50, 150));
  const [color] = useState(getRandomColor);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height,
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

const BoxStack = () => {
  const [showCount, setShowCount] = useState(0);
  const showNext = () => setShowCount(showCount + 1);
  const MAX_STACK_SIZE = 10;

  return (
    <>
      <Stack showCount={showCount} rowGap="10px">
        {Array.from({ length: MAX_STACK_SIZE }).map((_, index) => (
          <RandomBox key={index}>{index + 1}</RandomBox>
        ))}
      </Stack>
      <button
        type="button"
        disabled={showCount >= MAX_STACK_SIZE - 1}
        onClick={showNext}
        style={{ width: '100%', fontSize: '2rem' }}
      >
        {showCount < MAX_STACK_SIZE ? '상자 추가하기' : '끝!'}
      </button>
    </>
  );
};

const TextStack = () => {
  const [showCount, setShowCount] = useState(0);
  const showNext = () => setShowCount(showCount + 1);

  return (
    <>
      <Stack showCount={showCount} flow="reverse" rowGap="2rem">
        {POEMS.map((poem) => (
          <p key={poem.slice(0, 7)} style={{ padding: '2px', margin: 0 }}>
            {poem}
          </p>
        ))}
      </Stack>
      <button
        type="button"
        disabled={showCount >= POEMS.length}
        onClick={showNext}
        style={{ width: '100%', fontSize: '2rem' }}
      >
        {showCount < POEMS.length ? '감성 충전하기' : '끝!'}
      </button>
    </>
  );
};

export const NormalFlowExample: Story = {
  render: BoxStack,
};

export const ReverseFlowExample: Story = {
  render: TextStack,
};
