import { IRipple } from '@interfaces';
import { FC, useRef, useState } from 'react';
import styles from './ripple.module.scss';

const Ripple: FC<IRipple> = ({ children, classes = '', onClickHandler = null }) => {
  const targetElement = useRef<any>();
  const [spanStyles, setSpanStyles] = useState<any>({});
  const [count, setCount] = useState(0);
  let bounce: any = 0;

  /* Debounce Code to call the Ripple removing function */
  const callCleanUp = (cleanup: any, delay: any) => {
    return function () {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanup();
      }, delay);
    };
  };

  const showRipple = (e: any) => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - size / 2;
    const y = e.pageY - pos.y - size / 2;

    const spanStyles = {
      top: y + 'px',
      left: x + 'px',
      height: size + 'px',
      width: size + 'px',
    };
    const countinner = count + 1;
    setSpanStyles((prevstate: any) => ({
      ...prevstate,
      [countinner]: spanStyles,
    }));
    setCount(countinner);
  };

  const cleanUp = () => {
    setSpanStyles({});
    setCount(0);
  };

  const renderRippleSpan = () => {
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return spanArray.map((key, index) => {
        return <span key={`${'span-count-' + index}`} className="" style={{ ...spanStyles[key] }}></span>;
      });
    } else {
      return null;
    }
  };
  return (
    <div role="button" ref={targetElement} className={`${styles.ripple} ${classes}`.trim()} onClick={onClickHandler}>
      {children}
      <div className={styles.rippleContainer} onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 1000)}>
        {renderRippleSpan()}
      </div>
    </div>
  );
};

export default Ripple;
