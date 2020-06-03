export interface FaceDetectionResult {
  time: number;
  faces: Face[];
}

export interface Face {
  x: number;
  y: number;
  width: number;
  height: number;
}
