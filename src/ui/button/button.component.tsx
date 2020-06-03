import { ComponentChild, h } from 'preact';
import styled from 'styled-components';

interface Props {
  disabled?: boolean;
  activated?: boolean;
  loading?: boolean;
  wasmLogo?: boolean;
  jsLogo?: boolean;
  inline?: boolean;
  width?: number;
  children?: ComponentChild;
  onClick: (e: any) => any;
}

export const Button = ({
  disabled,
  activated,
  loading,
  width,
  wasmLogo,
  jsLogo,
  inline,
  children,
  onClick,
}: Props) => (
  <ButtonHTML
    disabled={disabled || activated}
    onClick={onClick}
    activated={activated}
    loading={loading}
    width={width}
    wasmLogo={wasmLogo}
    jsLogo={jsLogo}
    inline={inline}
  >
    <span>{loading ? '...' : children}</span>
  </ButtonHTML>
);

const ButtonHTML = styled.button.attrs<Props>(({ disabled }) => ({
  disabled: disabled,
}))<Props>`
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  width: ${({ width }) => (width ? `${width}px` : '120px')};
  margin: 1em;
  padding: 1em;
  border: solid 1px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .5);
  
  :hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .6);
  }
  
  :active {
    box-shadow: none;
  }
  
  :disabled {
    opacity: 0.4;
    box-shadow: none;
    cursor: default;
  }
  
  span {
    padding-left: ${({ wasmLogo, jsLogo }) =>
      !wasmLogo && !jsLogo ? '0' : '25px'};
  }
  
  
  
  ${({ wasmLogo, jsLogo }) =>
    !wasmLogo && !jsLogo
      ? `
    background: var(--primary-color);
    border: 1px solid var(--primary-dark-color);
    color: var(--light-color);
  `
      : ''} 

  ${({ loading }) =>
    loading
      ? `
    opacity: 0.5;
    border-color: black;
    box-shadow: none !important;
  `
      : ''}  

  ${({ disabled, activated }) =>
    disabled && activated
      ? `
    opacity: 1;
  `
      : ''}
  
  ${({ wasmLogo }) =>
    wasmLogo
      ? `
    background: url('/assets/logo/wasm-logo.png') 1px center no-repeat;
    border-color: var(--primary-color);
  `
      : ''} 

  ${({ jsLogo }) =>
    jsLogo
      ? `
    background: url('/assets/logo/js-logo.png') 1px center no-repeat;
    border-color: var(--thrd-color);
  `
      : ''}  
`;
