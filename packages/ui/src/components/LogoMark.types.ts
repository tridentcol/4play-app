import type { ColorValue } from '../tokens/colors';

export type LogoMarkProps = {
  size?: number;
  color?: ColorValue | string;
  ball?: ColorValue | string;
  bg?: ColorValue | string | 'transparent';
};

export type LogoProps = {
  size?: number;
  color?: ColorValue | string;
  ball?: ColorValue | string;
  /** When true, swaps to a stacked lockup (LogoMark above wordmark). */
  stacked?: boolean;
  /** When true, the wordmark uses cream instead of `color`. */
  dark?: boolean;
};
