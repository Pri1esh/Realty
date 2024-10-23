import { IPointer } from '@interfaces';
import { useDeviceType } from '@utils';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './projectMasterLayout.module.scss';

const Pointer = (props: IPointer) => {
  const { xVal = '0%', yVal = '0%', text = 'Property Info', container } = props;
  const [toolTipIdentifier, settoolTipIdentifier] = useState<string>(text + xVal + yVal);
  const { deviceType } = useDeviceType();

  const handleClick = () => {
    toolTipIdentifier === text + xVal + yVal ? settoolTipIdentifier('') : settoolTipIdentifier(text + xVal + yVal);
  };

  return (
    <OverlayTrigger
      container={container}
      trigger={
        deviceType !== 'desktop' && toolTipIdentifier === text + xVal + yVal ? ['click'] : ['hover', 'click', 'focus']
      }
      overlay={
        <Tooltip itemProp="name" className={styles.tooltipStyle}>
          {text}
        </Tooltip>
      }
      placement="top"
      transition={true}
    >
      <span
        className={styles.pointer}
        style={{
          left: xVal,
          bottom: yVal,
        }}
        onClick={handleClick}
      ></span>
    </OverlayTrigger>
  );
};

export default Pointer;
