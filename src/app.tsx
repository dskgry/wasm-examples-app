import { Fragment, h, render } from 'preact';
import { GlobalStyle } from './style';
import { Content } from './routing/content.component';
import { Header } from './routing/header.component';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Content />
    </Fragment>
  );
};

render(<App />, document.getElementById('main') as any);
