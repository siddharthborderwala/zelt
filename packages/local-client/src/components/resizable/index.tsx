import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './styles.css';

type ResizableProps = {
  direction: 'horizontal' | 'vertical';
};

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'flex',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.25, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_, { size: { width: w } }) => {
        setWidth(w);
      },
    };
  } else {
    resizableProps = {
      height: innerHeight * 0.4,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [innerHeight * 0.6, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [width]);

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
