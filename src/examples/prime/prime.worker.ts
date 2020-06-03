import { checkPrimes } from './calc-primes';
import { PrimeCalculationResult } from './prime-result';

interface PrimeWasmInstance {
  exports: {
    _checkPrimes: (countTo: number) => number;
  }
}

let primeWasmInstance: PrimeWasmInstance;

export const initialize = () => new Promise(async resolve => {
  if (primeWasmInstance) {
    resolve();
  } else {
    primeWasmInstance = (await (WebAssembly as any).instantiateStreaming(
      fetch('/assets/wasm/prime/checkPrimes.wasm'), {
        env: {
          __memory_base: 0
        }
      }
    )).instance as PrimeWasmInstance;
    resolve();
  }
});

export const runWasm = (countTo: number): Promise<PrimeCalculationResult> => new Promise(resolve => {
  const start = performance.now();
  const result = primeWasmInstance.exports._checkPrimes(countTo);
  resolve({
    took: Math.round(performance.now() - start),
    matches: result
  });
});

export const runJs = (countTo: number): Promise<PrimeCalculationResult> => new Promise(resolve => {
  const start = performance.now();
  const result = checkPrimes(countTo);
  resolve({
    took: Math.round(performance.now() - start),
    matches: result
  });
});
