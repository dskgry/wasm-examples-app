import { Nullable } from '../../../common/common';

export class Video {
  private videoElement: Nullable<HTMLVideoElement> = null;

  constructor(private width: number, private height: number) {
  }

  start(): Promise<Video> {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ video: true }).then(
        stream => {
          this.initVideo(stream);
          resolve(this);
        }
      );
    });
  }

  initVideo(stream: MediaStream) {
    const existingVideo = document.getElementById('video-elm');
    if (existingVideo) {
      this.videoElement = existingVideo as HTMLVideoElement;
    } else {
      this.videoElement = document.createElement('video');
      this.videoElement.id = 'video-elm';
      this.videoElement.style.display = 'none';
      this.videoElement.autoplay = true;
      this.videoElement.width = this.width;
      this.videoElement.height = this.height;
      document.body.appendChild(this.videoElement);
    }
    this.videoElement.srcObject = stream;
  }

  destroy() {
    const {
      videoElement
    } = this;

    if (videoElement) {
      (videoElement.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoElement.srcObject = null;
    }
  }


  getVideoElement() {
    return this.videoElement as HTMLVideoElement;
  }

}
