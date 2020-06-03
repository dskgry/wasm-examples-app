import { h } from 'preact';
import { Link } from 'preact-router/match';
import styled from 'styled-components';

export const ExamplesSubMenu = () => (
  <Wrap>
    <Link href='/prime' activeClassName='link-active'>
      Primes
    </Link>
    <Link href='/faces' activeClassName='link-active'>
      Face detect
    </Link>
  </Wrap>
);

const Wrap = styled.div`
  margin: 0 auto;
  border-top: none;
  width: 170px;
  display: flex;
  justify-content: space-between;
  padding: 0.2em 0.5em;
  background: var(--primary-color);
  box-shadow: 0 4px 5px -2px #343434;

  a {
    padding: 0 0.3em;
    color: var(--light-color);
    text-decoration: none;
  }

  a.link-active {
    font-weight: bold;
  }
`;
