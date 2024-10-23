import { useState } from 'react';
import style from './ImageMagnifier.module.scss';
function ImageMagnifier({
  src,
  alt,
  width,
  height,
  magnifierHeight = 25,
  magnifieWidth = 25,
  zoomLevel = 3,
}: {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [showOverlay, setshowOverlay] = useState(false);
  return (
    <div className={style.magnifierWrapper}>
      <div
        className={style.imgContainer}
        style={{
          position: 'relative',
          height: height,
          width: width,
        }}
      >
        <img
          src={src}
          className="img-fluid"
          style={{ height: height, width: width }}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
            setshowOverlay(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.scrollX;
            const y = e.pageY - top - window.scrollY;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
            setshowOverlay(false);
          }}
          alt={alt}
        />
        <div
          className={style.overlay}
          style={{
            display: showOverlay ? '' : 'none',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
          }}
        ></div>
      </div>
      <div
        className={style.zooming}
        style={{
          display: showMagnifier ? '' : 'none',
        }}
      >
        <div
          className={style.magnifierValue}
          style={{
            pointerEvents: 'none',
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: '1',
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgWidth * zoomLevel - 100}px ${imgHeight * zoomLevel - 100}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2 + x}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2 + y}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ImageMagnifier;
