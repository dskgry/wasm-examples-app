import { ComponentChildren, Fragment, h } from 'preact';
import styled from 'styled-components';
import { Button } from '../button/button.component';

interface Props {
  okText: string;
  responsive: boolean;
  onDialogClose: () => any;
  children: ComponentChildren;
  loading?: boolean;
}

export const Dialog = ({
  responsive,
  okText,
  onDialogClose,
  children,
  loading,
}: Props) => {
  return (
    <Fragment>
      <Modal responsive={responsive} />
      <DialogContainer responsive={responsive}>
        <DialogContent>{children}</DialogContent>
        <DialogButtons>
          <Button onClick={onDialogClose} disabled={loading}>
            {okText}
          </Button>
        </DialogButtons>
      </DialogContainer>
    </Fragment>
  );
};

const Modal = styled.div<{ responsive: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(3px);
  z-index: 2;

  @media all and (max-width: 900px) {
    ${(props) =>
      props.responsive &&
      `
      display: none;
  `}
  }
`;

const DialogContainer = styled.div<{ responsive: boolean }>`
  position: absolute;
  z-index: 3;
  background: white;
  min-width: 200px;
  min-height: 100px;
  border: solid 1px var(--border-color);
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 0 0 10% 0;
  
  @media all and (max-width: 900px) {
  ${(props) =>
    props.responsive &&
    `
    left: 0;
    top: 0;
    right: 0;
    transform: none;
    border-radius: 0;
  `}
   ${(props) =>
     !props.responsive &&
     `
      left: .5em;
      right: .5em;
      transform: none;
  `}
  }
}
`;

const DialogContent = styled.div`
  flex: 1;
  padding: 0.1em 1em;
`;

const DialogButtons = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
