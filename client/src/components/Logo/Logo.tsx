import { HTMLAttributes } from 'react';
import { Text } from '../../components';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  fontSize?: string;
  color?:
    | 'hiContrast'
    | 'loContrast'
    | 'link'
    | 'header'
    | 'white'
    | 'outlandOlive'
    | 'text';
  dotSize?: string;
  size?: string | number | any;
}

const Logo = ({ fontSize, dotSize, color, size, ...props }: LogoProps) => {
  return (
    <div style={{ display: 'inline-block' }} {...props}>
      <Text color={color} variant={'logo'} size={size ? size : 9}>
        Outland
        <span
          style={{
            color: color ? color : '$hiContrast',
            fontFamily: "'Sorts Mill Goudy', san-serif",
            fontSize: dotSize ? dotSize : '1rem',
            fontWeight: 400,
            WebkitTextStroke: `1px ${color ? color : '$hiContrast'}`,
          }}
        >
          0
        </span>
      </Text>
    </div>
  );
};

export default Logo;
