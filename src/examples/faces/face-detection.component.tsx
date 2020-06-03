import { Component, h } from 'preact';
import styled from 'styled-components';
import { VideoCanvas } from './cam/video-canvas';
import { WorkerCanvas } from './cam/worker-canvas';
import { Spinner } from '../../ui/spinner/spinner.components';
import { Video } from './cam/video';
import { Nullable } from '../../common/common';
import { FaceDetectionResult } from './faces';
import { initJsFaceDetection, jsDetectFaces } from './faces-js.worker';
import { initWasmFaceDetection, wasmDetectFaces } from './faces-wasm.worker';
import { Button } from '../../ui/button/button.component';
import { facesFilters, FilterDefinition } from './faces-filters';

const SCALE_FACTOR = 160;
const WIDTH = 310;
const HEIGHT = 220;
const SCALE = Math.round(WIDTH / SCALE_FACTOR);

interface Props {}

interface State {
  loading: boolean;
  runningWasm: boolean;
  runningJs: boolean;
  selectedFilter: FilterDefinition;
}

export class FaceDetectionComponent extends Component<Props, State> {
  private videoWrap: Nullable<HTMLDivElement> = null;
  private videoCanvas: Nullable<VideoCanvas> = null;
  private helperCanvas: Nullable<WorkerCanvas> = null;
  private video: Nullable<Video> = null;

  private currentFrame: Nullable<number> = null;
  private currentFaces: Nullable<FaceDetectionResult> = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      runningJs: false,
      runningWasm: false,
      selectedFilter: facesFilters[0],
    };
  }

  async componentDidMount() {
    await this.initVideo();
    await this.initDetection();

    requestAnimationFrame(() => {
      this.runWasm();
      this.setState({ loading: false });
    });
  }

  componentWillUnmount(): void {
    const { currentFrame, video } = this;

    if (video) {
      video.destroy();
    }

    if (currentFrame) {
      cancelAnimationFrame(currentFrame);
    }
  }

  private initDetection() {
    return Promise.all([initWasmFaceDetection(), initJsFaceDetection()]);
  }

  private initVideo() {
    this.videoCanvas = new VideoCanvas(this.videoWrap as any, WIDTH, HEIGHT);
    this.helperCanvas = new WorkerCanvas(WIDTH, HEIGHT, SCALE);
    return this.run();
  }

  private async run() {
    const { video } = this;

    if (!video) {
      this.video = await new Video(WIDTH, HEIGHT).start();
    }
    this.loop();
  }

  private loop = () => {
    const { video, helperCanvas, videoCanvas, currentFaces } = this;

    const { runningWasm, runningJs } = this.state;

    if (video && videoCanvas && helperCanvas) {
      videoCanvas.drawVideo({
        video: video.getVideoElement(),
        faces: currentFaces,
        scale: helperCanvas.getScale(),
        mode: runningWasm ? 'WASM' : runningJs ? 'JS' : null,
      });
    }

    this.currentFrame = requestAnimationFrame(this.loop);
  };

  private runWasm = async () => {
    const { video, helperCanvas } = this;

    this.setState({
      runningWasm: true,
      runningJs: false,
    });

    this.currentFaces = await wasmDetectFaces(
      (helperCanvas as WorkerCanvas).getScaledImageData(
        (video as Video).getVideoElement(),
      ),
    );

    if (this.state.runningWasm) {
      this.runWasm();
    }
  };

  private runJs = async () => {
    const { video, helperCanvas } = this;

    this.setState({
      runningWasm: false,
      runningJs: true,
    });

    this.currentFaces = await jsDetectFaces(
      (helperCanvas as WorkerCanvas).getScaledImageData(
        (video as Video).getVideoElement(),
      ),
    );
    if (this.state.runningJs) {
      this.runJs();
    }
  };

  private changeFilter = (e: any) => {
    const { videoCanvas } = this;

    const selectedFilter = facesFilters.find(
      (filter) => filter.name === e.target.value,
    ) as FilterDefinition;
    this.setState({ selectedFilter });

    if (videoCanvas) {
      videoCanvas.updateDrawFunction(selectedFilter.filter);
    }
  };

  render(
    props: Props,
    { loading, runningJs, runningWasm, selectedFilter }: State,
  ) {
    return (
      <Wrap>
        <Filters>
          <label>
            <span>Filter</span>
            <select onInput={this.changeFilter}>
              {facesFilters.map((filter) => (
                <option
                  key={filter.name}
                  value={filter.name}
                  selected={selectedFilter.name === filter.name}
                >
                  {filter.displayName}
                </option>
              ))}
            </select>
          </label>
        </Filters>
        <VideoWrap>
          {loading && <Spinner />}
          <VideoElement
            style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
            ref={(ref) => (this.videoWrap = ref as HTMLDivElement)}
          />
        </VideoWrap>
        <ButtonWrap>
          <Button
            wasmLogo={true}
            disabled={loading}
            activated={runningWasm}
            width={200}
            onClick={this.runWasm}
          >
            Wasm detection
          </Button>
          <Button
            jsLogo={true}
            disabled={loading || runningJs}
            activated={runningJs}
            width={200}
            onClick={this.runJs}
          >
            Js detection
          </Button>
        </ButtonWrap>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  margin: 1em auto;
  display: block;
`;

const VideoWrap = styled.div`
  position: relative;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  @media all and (max-width: 470px) {
    flex-direction: column;
    button {
      margin: 5px auto 0 auto;
      display: block;
    }
  }
`;

const VideoElement = styled.div`
  margin: 0 auto;
  background: gainsboro;
  border: solid 1px gainsboro;
`;

const Filters = styled.div`
  margin: auto;
  width: 310px;
  padding: 0 0 0.3em 0.3em;
  text-align: center;

  span {
    display: inline-block;
    padding: 0 0.3em 0 0;
  }

  select {
    display: inline-block;
    padding: 0.3em 1em;
  }
`;
