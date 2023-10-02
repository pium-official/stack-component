import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Stack from '..';
import { POEMS } from './fixtures';

const meta: Meta<typeof Stack> = {
  component: Stack,

  argTypes: {
    showCount: {
      control: { type: 'range', min: 0, max: POEMS.length, step: 1 },
    },
    as: { defaultValue: { summary: '"div"' } },
    flow: { defaultValue: { summary: '"reverse"' } },
    time: { defaultValue: { summary: 400 } },
    justifyItems: {
      table: { type: { detail: 'CSS의 `justify-items`' } },
      defaultValue: { summary: '"normal"' },
    },
    rowGap: {
      table: { type: { detail: 'CSS의 `row-gap`' } },
      defaultValue: { summary: 0 },
    },
  },

  args: {
    showCount: 1,
    as: 'div',
    flow: 'reverse',
    time: 400,
    justifyItems: 'normal',
    rowGap: 0,
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

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      버튼을 누른 횟수: {count}
    </button>
  );
};

const BoxStack = (props: Pick<React.ComponentProps<typeof Stack>, 'flow'>) => {
  const { flow = 'reverse' } = props;
  const [showCount, setShowCount] = useState(0);
  const showNext = () => setShowCount(showCount + 1);
  const MAX_STACK_SIZE = 10;

  return (
    <>
      <Stack showCount={showCount} flow={flow} rowGap="10px">
        {Array.from({ length: MAX_STACK_SIZE }).map((_, index) => (
          <RandomBox key={index}>
            {index + 1}번 상자 &nbsp; <Counter />
          </RandomBox>
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

export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      {POEMS.map((poem, index) => (
        <p key={poem.slice(0, 7)} style={{ padding: '2px', margin: 0 }}>
          {index + 1}번 <br /> {poem}
        </p>
      ))}
    </Stack>
  ),
};

export const NormalFlowExample: Story = {
  render: () => <BoxStack flow="normal" />,
  argTypes: {
    showCount: { table: { disable: true } },
    as: { table: { disable: true } },
    flow: { table: { disable: true } },
    time: { table: { disable: true } },
    justifyItems: { table: { disable: true } },
    rowGap: { table: { disable: true } },
  },
};

export const ReverseFlowExample: Story = {
  render: () => <BoxStack flow="reverse" />,
  argTypes: {
    showCount: { table: { disable: true } },
    as: { table: { disable: true } },
    flow: { table: { disable: true } },
    time: { table: { disable: true } },
    justifyItems: { table: { disable: true } },
    rowGap: { table: { disable: true } },
  },
};
