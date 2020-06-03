import { h } from 'preact';
import styled from 'styled-components';
import { Link } from 'preact-router';

export const Header = () => (
  <Wrap>
    <LogoWrap>
      <Link href='/'>
        <Logo />
      </Link>
    </LogoWrap>
  </Wrap>
);

const Wrap = styled.header`
  background: var(--primary-color);
  box-shadow: 0 4px 5px -2px #343434;
  display: flex;
  flex-direction: column;
`;

const LogoWrap = styled.div`
  flex: 1;
  padding: 0.2em;
`;

const Logo = styled.div`
  background-image: url('/assets/logo/wasm-logo.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 90px;
  height: 47px;
  margin: auto;
`;
