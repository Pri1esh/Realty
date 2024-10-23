import { CustomImage } from '@components';
import { IProjectMasterLayout } from '@interfaces';
import { useRef } from 'react';
import { Figure } from 'react-bootstrap';

import Pointer from './Pointer';
import styles from './projectMasterLayout.module.scss';

const ProjectMasterLayout = (props: IProjectMasterLayout) => {
  const { property } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} itemProp="associatedMedia" className={styles.propertyMain}>
      <div className={styles.propertyMasterLayout}>
        <Figure>
          <CustomImage
            itemProp="image"
            src={property?.image ? property?.image : ''}
            className="img-fluid imgBackground"
            alt={property?.imgAlt}
          />
        </Figure>
        {property?.points.map((point: { left: string; bottom: string; title: string }, index: number) => {
          return (
            <Pointer
              key={`${point.left + point.bottom + index}`}
              xVal={point.left}
              yVal={point.bottom}
              text={point.title}
              container={containerRef}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProjectMasterLayout;
