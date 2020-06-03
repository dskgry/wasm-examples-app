import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Spinner } from '../../ui/spinner/spinner.components';
import { Nullable } from '../../common/common';
import { PrimeCalculationResult } from './prime-result';
import { initialize, runJs, runWasm } from './prime.worker';
import styled from 'styled-components';
import { ResultView } from './result-view.component';
import { Button } from '../../ui/button/button.component';
import { ExamplesSubMenu } from '../examples-submenu.component';

const MIN_VAL = 10;
const MAX_VAL = 300000;
const INIT_VALUE = 100000;

export const Prime = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [wasmLoading, setWasmLoading] = useState<boolean>(false);
  const [jsLoading, setJsLoading] = useState<boolean>(false);

  const [resultWasm, setResultWasm] = useState<
    Nullable<PrimeCalculationResult>
  >(null);
  const [resultJs, setResultJs] = useState<Nullable<PrimeCalculationResult>>(
    null,
  );

  const [countTo, setCountTo] = useState<number>(INIT_VALUE);

  useEffect(() => {
    initialize().then(() => setLoading(false));
  }, []);

  const changeMaxNumber = (newValue: string) => {
    const valueAsNumber = parseInt(newValue, 10);

    if (isNaN(valueAsNumber)) {
      setCountTo(MIN_VAL);
    } else {
      if (valueAsNumber > MAX_VAL) {
        setCountTo(MAX_VAL);
      } else if (valueAsNumber < MIN_VAL) {
        setCountTo(MIN_VAL);
      } else {
        setCountTo(valueAsNumber);
      }
    }

    setResultWasm(null);
    setResultJs(null);
  };

  const calculateWithWasm = async () => {
    setResultWasm(null);
    setWasmLoading(true);
    setResultWasm(await runWasm(countTo));
    setWasmLoading(false);
  };

  const calculateWithJs = async () => {
    setResultJs(null);
    setJsLoading(true);
    setResultJs(await runJs(countTo));
    setJsLoading(false);
  };

  return (
    <Fragment>
      <ExamplesSubMenu />
      {loading && <Spinner />}
      {!loading && (
        <Wrap>
          <Label>
            Count primes in range:
            <input
              type='number'
              onChange={(e) => changeMaxNumber((e.target as any).value)}
              min={MIN_VAL}
              max={MAX_VAL}
              disabled={wasmLoading || jsLoading}
              value={countTo}
            />
          </Label>
          <ButtonsWrap>
            <Button
              onClick={calculateWithWasm}
              wasmLogo={true}
              loading={wasmLoading}
            >
              Calculate
            </Button>
            <Button jsLogo={true} loading={jsLoading} onClick={calculateWithJs}>
              Calculate
            </Button>
          </ButtonsWrap>
          <ResultView resultWasm={resultWasm} resultJs={resultJs} />
        </Wrap>
      )}
    </Fragment>
  );
};

export const Wrap = styled.div`
  padding: 0.5em 0.2em;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    display: block;
    padding: 1em;
    outline: none;
    border: none;
    border-bottom: solid 1px var(--secondary-color);
  }

  input:disabled {
    background: white;
    color: var(--disabled-color);
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: center;
`;
