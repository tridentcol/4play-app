import type { IconDef } from './data';

export type IconProps = {
  size?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
};

export type RawIconProps = IconProps & {
  shapes: IconDef;
};
