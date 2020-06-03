if (!(window as any).OffscreenCanvas) {
  polyFillOffscreenCanvas();
}

export class WorkerCanvas {
  private canvas: OffscreenCanvas;
  private context: OffscreenCanvasRenderingContext2D;

  constructor(width: number,
              height: number,
              private scale: number) {
    this.canvas = new OffscreenCanvas(width, height);
    this.context = this.canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
  }

  getScale() {
    return this.scale;
  }

  getScaledImageData(video: CanvasImageSource) {
    const {
      context,
      scale
    } = this;

    const scaledWidth = Math.round(video.width as number / scale);
    const scaledHeight = Math.round(video.height as number / scale);

    context.drawImage(video, 0, 0, scaledWidth, scaledHeight);

    return context.getImageData(0, 0, scaledWidth, scaledHeight);
  }
}

function polyFillOffscreenCanvas() {
  (window as any).OffscreenCanvas = class OffscreenCanvas {
    private canvas: any;

    constructor(width: number, height: number) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;

      this.canvas.convertToBlob = () => {
        return new Promise(resolve => {
          this.canvas.toBlob(resolve);
        });
      };

      return this.canvas;
    }
  };
}
