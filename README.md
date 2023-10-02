# Stack Layout Component

리액트와 스타일드 컴포넌트를 이용해서 구현한 스택 형태의 레이아웃 컴포넌트.

- [npm](https://www.npmjs.com/package/@pium/stack-component)
- [demo: storybook](https://blog.pium.life/stack-component/)

## 사용 전 주의사항

프로젝트에 다음 세 가지가 설치되어 있어야 해요.
- react
- react-dom
- styled-components

## 설치

```bash
npm install @pium/stack-component
```

## 컴포넌트 설명

### 기능

Stack은 주어진 자식 요소들을 세로로 정렬한 후, 원하는 만큼의 개수만 보여줍니다.

### 주의사항

- `Stack`은 자식 요소에 애니메이션을 삽입하므로 겹치지 않게 주의해주세요!
- JSX 상에서 `Stack`의 직속 자녀들만을 대상으로 합니다.

### Props

|이름|설명|가능한 값|기본값|
|:-:|:-:|:-:|:-:|
|`showCount`*|보여줄 요소의 개수.|`number`|-|
|`as`|Stack에 적용할 semantic tag|`"div"`, `"ul"`, `"ol"`, `"main"`, `"section"`, `"article"`|`"div"`|
|`flow`|`normal`: JSX에 나타난 순서대로 DOM에 표시됩니다. 새로운 요소는 아래에서 위로 올라옵니다.<br /><br />`reverse`: JSX에 나타난 순서의 반대로 DOM에 표시됩니다. 새로운 요소는 위에서 아래로 떨어집니다.|`"normal"`, `"reverse"`|`"reverse"`|
|`time`|새로운 요소가 생길 때 나타나는 애니메이션 시간(밀리초).|`number`|`400`|
|`justifyItems`|CSS의 `justify-items`|`React.CSSProperties['justifyItems']`|`"normal"`|
|`rowGap`|CSS의 `row-gap`|`React.CSSProperties['rowGap']`|`0`|

### 예제

```tsx
import { Stack } from '@pium/stack-component';

<Stack
  as="main"
  showCount={2}
  flow="normal"
  rowGap="2rem"
  time={777}
  justifyItems="center"
>
  <p>새는 자기 길을 안다</p>
  <p>김종해</p>
  <p>하늘에 길이 있다는 것을</p>
  <p>새들이 먼저 안다</p>
  <p>하늘에 길을 내며 날던 새는</p>
  <p>길을 또 지운다</p>
  <p>새들이 하늘 높이 길을 내지 않는 것은</p>
  <p>그 위에 별들이 가는 길이 있기 때문이다</p>
</Stack>
```