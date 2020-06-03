import { Face, FaceDetectionResult } from './faces';

let haarDetector: any;

export const initJsFaceDetection = () => new Promise(resolve => {
  const worker = self as any;
  if (worker.HAAR) {
    resolve();
  } else {
    importScripts('/assets/haarjs/haar-detector.min.js', '/assets/haarjs/haarcascade_frontalface_alt.min.js');
    haarDetector = new worker.HAAR.Detector(worker.haarcascade_frontalface_alt, false).selection('auto');
    resolve();
  }
});

export const jsDetectFaces = async (imageData: any): Promise<FaceDetectionResult> => {
  const start = performance.now();
  const faces = haarDetector.image(imageData, 1).detectSync(1, 1.1, 0.12);

  const rects: Face[] = [];
  for (let i = 0, length = faces.length; i < length; i++) {
    const { x, y, width, height } = faces[i];
    rects.push({ x, y, width, height });
  }

  return {
    faces: rects,
    time: performance.now() - start
  };
};
