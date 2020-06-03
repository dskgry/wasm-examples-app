import styled from 'styled-components';
import { h } from 'preact';
import { PrimeCalculationResult } from './prime-result';
import { Nullable } from '../../common/common';

interface Props {
  resultWasm: Nullable<PrimeCalculationResult>;
  resultJs: Nullable<PrimeCalculationResult>;
}

export const ResultView = ({ resultWasm, resultJs }: Props) => (
  <Wrap>
    <section>
      <table>
        <thead>
          <tr>
            <th style={{ width: '20%' }}></th>
            <th style={{ width: '40%' }}>Wasm</th>
            <th style={{ width: '40%' }}>JS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Took (in ms)</td>
            <td>{resultWasm !== null ? <p>{resultWasm.took}</p> : <p>-</p>}</td>
            <td>{resultJs !== null ? <p>{resultJs.took}</p> : <p>-</p>}</td>
          </tr>
          <tr>
            <td>Result</td>
            <td>
              {resultWasm !== null ? <p>{resultWasm.matches}</p> : <p>-</p>}
            </td>
            <td>{resultJs !== null ? <p>{resultJs.matches}</p> : <p>-</p>}</td>
          </tr>
        </tbody>
      </table>
    </section>
    {resultWasm && resultJs && (
      <Comparision>
        Wasm was{' '}
        {resultJs.took > 0
          ? Math.round((1 - resultWasm.took / resultJs.took) * 100)
          : 0}
        % faster
      </Comparision>
    )}
  </Wrap>
);

const Wrap = styled.div`
  display: block;

  table {
    width: 95%;
    margin: 1em auto;
    border-collapse: collapse;
  }

  table th {
    text-align: left;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: var(--primary-color);
    color: var(--light-color);
  }

  table td,
  th {
    border: 1px solid #ddd;
    padding: 0.5em;
  }

  table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Comparision = styled.p`
  text-align: center;
  font-weight: bold;
`;
