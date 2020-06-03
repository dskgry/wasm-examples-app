import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 :root {
  --white: #ffffff;
  --light-color: #fafafa;
  --disabled-color: #e5e5e5;
  --primary-color: #654ff0;
  --primary-dark-color: #45368b;
  --secondary-color: #a5668b;
  --thrd-color: #f7df1e;
  --dark-color: #0e103d;
  --border-color: #e9e9e9;
}

html {
  min-height: 100%;
  display: flex;
}

body {
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  font-family: "segoe ui", "helvetica neue", "helvetica", "lucida grande", arial, "ubuntu", "cantarell", "fira sans", sans-serif;
  color: var(--dark-color);
  background: var(--light-color);
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 800px;
  margin: 0 auto;
}

@media all and (max-width: 360px) {
  main {
    padding: 0 0 0 0;
  }
}
`;
