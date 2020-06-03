import { Face } from './faces';
import { Nullable } from '../../common/common';

export type VideoFilter = (context: CanvasRenderingContext2D, face: Face, mode?: Nullable<string>) => void;

export interface FilterDefinition {
  name: string;
  displayName: string;
  filter: VideoFilter;
}

export const facesFilters: FilterDefinition[] = [
  {
    name: 'box',
    displayName: 'Box',
    filter: (context, { x, y, width, height }, mode?: Nullable<string>) => {
      context.strokeStyle = getColor(mode);
      context.strokeRect(x, y, width, height);
    }
  },
  {
    name: 'private',
    displayName: 'Private',
    filter: (ctx, { x, y, width, height }, mode?: Nullable<string>) => {
      ctx.fillStyle = getColor(mode);
      const eyesStart = height / 4;
      const eyesEnd = height / 5;
      ctx.fillRect(x, y + eyesStart, width, eyesEnd);
    }
  },
  {
    name: 'logo',
    displayName: 'Logo',
    filter: (ctx, { x, y, width, height }, mode?: Nullable<string>) => {
      ctx.fillStyle = 'rgba(255,255,255)';
      ctx.fillRect(x, y, width, height);
      ctx.drawImage(getLogo(mode), x, y, width, height);
    }
  }
];

const getColor = (mode?: Nullable<string>) => mode === 'WASM' ? 'rgb(98,111,255)' : 'rgb(247,223,30)';
const getLogo = (mode?: Nullable<string>) => mode === 'WASM' ? wasmLogo : jsLogo;
const wasmLogo = new Image();
wasmLogo.src = '/assets/logo/wasm-logo-big.png';
const jsLogo = new Image();
jsLogo.src = '/assets/logo/js-logo-big.png';
