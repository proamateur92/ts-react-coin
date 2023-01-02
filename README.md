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
