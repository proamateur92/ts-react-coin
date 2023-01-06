# 노마드코더 리액트 강의 - CRYPTO TRACKER

참고 api 사이트

```
https://coinpaprika.com/ko/
```

<br>

타입스크립트 설정

```
https://github.com/proamateur92/react_ts_example
```

<br>

라이브러리 설치

```
npm i react-router-dom@6.3.0 react-query styled-components
```

<br>

\*\* 참고

> router v6 버전부터 useParams의 타입을 지정해주지 않아도 string 타입으로 지정된다.

<br>

#### style 전역 설정하기

- 이전까지 styled-component를 사용하면 지정 컴포넌트에 고립되어 스타일링이 가능했다.
- global style을 적용해보자.

<br>

#### App.tsx

```
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
      margin:0;
      padding:0;
      border:0;
      outline:0;
      font-size:100%;
      vertical-align:baseline;
      background:transparent;
  }

  body {
      line-height:1;
  }

...

  `;

    <>
      <GlobalStyle />
      <Router />
    </>
```

<br>

## Theme 설정하기

<!-- style.d.ts 설명 추가하기 -->

<br>

\*\* 색 참고 사이트

```
https://flatuicolors.com/
```

<br>

#### theme.ts

```
import {DefaultTheme} from "styled-components";

export const darkTheme: DefaultTheme = {
  textColor: "whitesmoke",
  bgColor: "#111",
};
```

<br>

#### index.tsx

```
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

<br>

## Data Fetching

### Coins.tsx

> 받아올 데이터의 타입을 지정해준다.

```
interface coinInterface {
    id: string;
    name: string;
    Symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }
```

<br>

### Coins.tsx

> Data Fetching - API 호출
> ()() 함수를 바로 실행하고 싶을 때 사용한다.

```
useEffect(() => {
  setLoading(true);
  try {
    (async () => {
      const response = await axios.get(
        "https://api.coinpaprika.com/v1/coins"
      );

      setCoins(response.data.slice(0, 100));
      setLoading(false);
    })();
  } catch (error) {
    console.log(error);
  }
}, []);
```

<br>
#### Little tips!
- Link 컴포넌트의 to property에 리터럴 템플릿을 사용할 때 {} 중괄호로 묶어 사용한다.
```
<Item key={coin.id}>
  <Link to={`/${coin.name}`}>{coin.name} &rarr;</Link>
</Item>
```

<br>

## API로부터 코인 이미지 가져오기

> 참고 사이트

```
https://coinicons-api.vercel.app/

https://coinicons-api.vercel.app/api/icon/btc
https://coinicons-api.vercel.app/api/icon/yfi
```

<br>

## Link에 state 담아 넘기기

- 파라미터로 코인 아이디를 넘긴다고 가정했을 때 다른 화면에서 해당 코인 아이디를 통해 코인 정보를 받아와야한다.
- 기존에 이미 코인 정보를 가지고 있다면 해당 정보를 state에 담아 router를 통해 전달할 수 있다.
- url에 링크를 바로 입력하여 접속하는 사용자의 경우에는 state가 만들어지지 않은 상태이기 때문에 코인 정보를 받아올 수 없다.
- optional chaining을 통해 안내 문구를 띄워준다. (본질적인 해결 방안은 아님.)

<br>

## 비트코인 정보 가져오기

```
<!-- coin id로 코인 정보 받기 (Coins) -->
https://api.coinpaprika.com/v1/coins/btc-bitcoin

<!-- coin id로 코인 시세 정보 얻기 (Tickers) -->
https://api.coinpaprika.com/v1/tickers/btc-bitcoin
```

<br>

##### api로 가져온 데이터 형식 interface 만들기

> 콘솔에서 Object key와 value를 가져온다.
> store object as global vairable
>
> 타입이 배열인 경우 해당 배열의 타입을 정의하기 위해 Interface를 만들어주어야 한다.

<br>

## 중첩 라우팅

- 하위 컴포넌트 이하에 하위 라우팅을 해보자

#### Coin.tsx

```
...

<Routes>
  <Route path={"chart"} element={<Chart />} />
  <Route path={"price"} element={<Price />} />
</Routes>
...

```

-> 이와 같이 작성하면 에러가 발생한다.
No routes matched location "/btc-bitcoin/chart"

#### Router.tsx

```

> 아래 코드를 추가하는 방법 이외에도 여러 방법이 있다.
...

<Route path={"/:coinId/*"} element={<Coin />} />

...

```

<br>

## url이 일치하는지 체크

- useMatch 훅을 사용한다.
- url과 일치하는 파라미터라면 객체를 반환하고 그렇지 않으면 null을 반환한다.

#### Coin.tsx

```
const priceMatch = useMatch("/:coinId/price");
const chartMatch = useMatch("/:coinId/chart");
```

<br>

## 컴포넌트 스타일링 props

- ts를 사용한다면 컴포넌트 스타일링에 props를 내려줄 때 또한 타입을 선언해주어야 한다.

#### Coin.tsx

```
...

<Tap isActive={priceMatch !== null ? true : false}>

...

const Tap = styled.div<{ isActive: boolean }>`

...

`;

```
