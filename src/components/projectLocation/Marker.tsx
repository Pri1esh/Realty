import { CustomImage } from '@components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './projectLocation.module.scss';

const Marker = (props: any) => {
  const { name, imgLogo, projectLocation } = props;
  return (
    <div className={styles.marker} title={name}>
      <OverlayTrigger
        overlay={
          <Tooltip className={styles.tooltip}>
            <div>
              {projectLocation?.address1}
              <p>{projectLocation?.address2}</p>
              <p>
                {projectLocation?.city},{projectLocation?.state}-{projectLocation?.pincode},{projectLocation?.country}
              </p>
              <p>{projectLocation?.contact}</p>
            </div>
          </Tooltip>
        }
        placement="top"
        transition={true}
      >
        <span>
          <CustomImage src={imgLogo} alt="project-logo" className={styles.markerImg} />
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default Marker;
