import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  const [width, setWidth] = useState<number>();
  const size = 68.75;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setWidth(size * 16);
      } else {
        setWidth(size * 13);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}
