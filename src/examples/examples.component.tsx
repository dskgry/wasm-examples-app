import { Fragment, h } from 'preact';
import { Link } from 'preact-router/match';
import styled from 'styled-components';

export const Examples = () => (
  <Fragment>
    <HeadLine>Pick an example.</HeadLine>
    <ul>
      <li>
        <Link href='/prime'>Prime number calculation</Link>
        <p>
          Calculates the prime numbers in a given range with both JavaScript and
          WebAssembly and compares the computation speed.
        </p>
      </li>
      <li>
        <Link href='/faces'>Face detection with openCV</Link>
        <p>
          Face detection using openCV. You can choose between using openCV
          compiled to WebAssembly and openCV compiled to plain JavaScript.
        </p>
      </li>
    </ul>
  </Fragment>
);

const HeadLine = styled.h2`
  padding-left: 0.2em;
`;
