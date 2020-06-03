import { facesFilters, FilterDefinition, VideoFilter } from '../faces-filters';
import { Nullable } from '../../../common/common';
import { FaceDetectionResult } from '../faces';

const WASM_LOGO = new Image();
WASM_LOGO.src = '/assets/logo/wasm-logo.png';

const JS_LOGO = new Image();
JS_LOGO.src = '/assets/logo/js-logo.png';

export class VideoCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private currentFilter: VideoFilter;
  private fpsColor: string;

  constructor(container: HTMLDivElement, width: number, height: number) {
    const canvasElement = document.createElement('canvas');
    container.appendChild(canvasElement);

    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = width;
    this.canvas.height = height;

    this.fpsColor = 'rgb(0,0,0)';
    this.currentFilter = (facesFilters[0] as FilterDefinition).filter;
  }

  updateDrawFunction(filter?: VideoFilter) {
    this.currentFilter = filter ? filter : (facesFilters[0] as FilterDefinition).filter;
  }

  toDataURL(): Nullable<string> {
    const {
      canvas
    } = this;

    return canvas.toDataURL('image/jpeg', 1.0);
  }

  drawVideo({
              video,
              faces,
              scale,
              mode
            }: { video: HTMLVideoElement, faces: Nullable<FaceDetectionResult>, scale: number, mode: Nullable<string> }) {
    const {
      canvas,
      context
    } = this;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (faces) {
      this.drawFaces(faces, scale, mode);
    }

    if (mode === 'WASM') {
      this.drawLogo(WASM_LOGO);
    }
    if (mode === 'JS') {
      this.drawLogo(JS_LOGO);
    }

  }

  drawLogo(logo: HTMLImageElement) {
    const {
      context
    } = this;

    context.fillStyle = 'rgba(255,255,255)';
    context.fillRect(0, 0, 32, 32);
    context.drawImage(logo, 0, 0, 32, 32);
  }

  drawFaces({ faces, time }: FaceDetectionResult,
            scale: number,
            mode: Nullable<string>) {
    const {
      context,
      currentFilter
    } = this;

    this.drawFps(time);

    for (let i = 0, length = faces.length; i < length; i++) {
      const rect = faces[i];
      currentFilter(context, {
        x: rect.x * scale,
        y: rect.y * scale,
        width: rect.width * scale,
        height: rect.height * scale
      }, mode);
    }
  }


  drawFps(time: number) {
    const {
      context,
      canvas,
      fpsColor
    } = this;

    const {
      width
    } = canvas;

    context.strokeStyle = fpsColor;
    context.lineWidth = 2;
    context.fillStyle = 'rgba(255,255,255,.5)';
    context.fillRect(width - 100, 0, width, 35);
    context.font = 'normal 16pt Arial';
    context.fillStyle = fpsColor;

    const fps = Math.round(1000 / time);
    context.fillText((fps < 10 ? `0${fps}` : fps) + ' FPS', width - 80, 25);
  }
}
