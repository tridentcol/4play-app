import type { RawIconProps } from './Icon.types';
import type { IconShape } from './data';

function renderShape(shape: IconShape, index: number) {
  switch (shape.kind) {
    case 'path':
      return <path key={index} d={shape.d} />;
    case 'circle':
      return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} />;
    case 'rect':
      return (
        <rect
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
        />
      );
  }
}

export function Icon({
  shapes,
  size = 20,
  stroke = 'currentColor',
  fill = 'none',
  strokeWidth = 1.8,
}: RawIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map(renderShape)}
    </svg>
  );
}
