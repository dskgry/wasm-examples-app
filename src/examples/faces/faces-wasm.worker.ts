import { Face, FaceDetectionResult } from './faces';

let cv: any;
let cascadeClassifier: any;
const FACE_CASCADE_FILE_URL = '/assets/wasm/face/haarcascade_frontalface_alt.xml';
const FACE_CASCADE_FILE_PATH = 'haarcascade_frontalface.xml';


export const initWasmFaceDetection = () => new Promise(resolve => {
  const worker = self as any;
  if (worker.cv) {
    resolve();
  } else {
    importScripts('/assets/wasm/face/opencv_glue.js');

    worker.cv().onRuntimeInitialized = () => {
      cv = worker.Module;
      cascadeClassifier = new cv.CascadeClassifier();

      createFileFromUrl(FACE_CASCADE_FILE_URL, FACE_CASCADE_FILE_PATH).then(() => {
        cascadeClassifier.load(FACE_CASCADE_FILE_PATH);
        resolve();
      });
    };
  }
});

export const wasmDetectFaces = async (imageData: any): Promise<FaceDetectionResult> => {
  const start = performance.now();

  const img = cv.matFromImageData(imageData);
  const faces = new cv.RectVector();

  const imgGray = new cv.Mat();
  cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY);

  cascadeClassifier.detectMultiScale(imgGray, faces);

  const rects: Face[] = [];
  for (let i = 0, length = faces.size(); i < length; i++) {
    const { x, y, width, height } = faces.get(i);
    rects.push({ x, y, width, height });
  }

  img.delete();
  faces.delete();
  imgGray.delete();

  return {
    faces: rects,
    time: performance.now() - start
  };
};

const createFileFromUrl = (url: string, path: string) => fetch(url)
  .then(response => response.arrayBuffer())
  .then(data => cv.FS_createDataFile('/', path, new Uint8Array(data), true, false, false));


