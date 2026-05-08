import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { RawIconProps } from './Icon.types';
import type { IconShape } from './data';

function renderShape(shape: IconShape, index: number, stroke: string, fill: string, sw: number) {
  switch (shape.kind) {
    case 'path':
      return (
        <Path
          key={index}
          d={shape.d}
          stroke={stroke}
          fill={fill}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'circle':
      return (
        <Circle
          key={index}
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
          stroke={stroke}
          fill={fill}
          strokeWidth={sw}
        />
      );
    case 'rect':
      return (
        <Rect
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
          stroke={stroke}
          fill={fill}
          strokeWidth={sw}
        />
      );
  }
}

export function Icon({
  shapes,
  size = 20,
  stroke = '#0E1B2C',
  fill = 'none',
  strokeWidth = 1.8,
}: RawIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {shapes.map((shape, i) => renderShape(shape, i, stroke, fill, strokeWidth))}
    </Svg>
  );
}
