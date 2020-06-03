import { Fragment, h } from 'preact';
import { ExamplesSubMenu } from '../examples-submenu.component';
import { useState } from 'preact/hooks';
import { Button } from '../../ui/button/button.component';
import styled from 'styled-components';
import { FaceDetectionComponent } from './face-detection.component';

export const FacesComponent = () => {
  const [running, setRunning] = useState<boolean>(false);

  return (
    <Fragment>
      <ExamplesSubMenu />
      {running && <FaceDetectionComponent />}
      {!running && (
        <Disclaimer>
          <p>
            Press start to initialize the Wasm and JavaScript face detection.
            <b> Access to your WebCam</b> will be requested, but{' '}
            <b>absolutely no image data</b> will be transferred to any{' '}
            <b>server</b>.
          </p>
          <Button inline={true} onClick={() => setRunning(true)}>
            Let&apos;s go
          </Button>
        </Disclaimer>
      )}
    </Fragment>
  );
};

const Disclaimer = styled.div`
  text-align: center;
  max-width: 300px;
  overflow: hidden;
  margin: 0 auto;

  p {
    display: block;
  }
`;
