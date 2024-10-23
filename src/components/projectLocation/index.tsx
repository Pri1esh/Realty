import { IProjectLocation } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './projectLocation.module.scss';

const ProjectLocation = (props: IProjectLocation) => {
  const { projectLocation, mapUrl, contactUsLabel, projectTitle } = props;
  const { deviceType } = useDeviceType();
  const [open, setOpen] = useState(false);

  return (
    <div itemScope itemType="https://schema.org/Place" className={styles.projectLocation}>
      <iframe
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        title={projectTitle}
        itemProp="hasMap"
        src={mapUrl}
        width="600"
        height={deviceType === 'desktop' ? '570' : '500'}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        frameBorder={'0'}
      ></iframe>
      {deviceType === 'desktop' ? (
        <>
          {projectLocation?.address1 && (
            <div className={styles.addressBox}>
              <h3 itemProp="name">{contactUsLabel}</h3>
              <div itemProp="address">
                <p itemProp="description">{projectLocation?.address1}</p>
                <p itemProp="description">{projectLocation?.address2}</p>
                <p itemProp="description">{projectLocation?.city ? `${projectLocation?.city.trim()},` : ''}</p>
                <p itemProp="description">
                  {projectLocation?.state ? projectLocation?.state.trim() : ''}
                  {projectLocation?.pincode ? ` - ${projectLocation?.pincode.trim()}, ` : ', '}
                  {projectLocation?.country ? projectLocation?.country.trim() : ''}
                </p>
                <p itemProp="description">{projectLocation?.contact}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {projectLocation?.address1 && (
            <div className={styles.addressBox}>
              <div
                itemProp="potentialAction"
                onClick={() => setOpen(!open)}
                aria-controls="collapse-text"
                aria-expanded={open}
              >
                <h3>
                  {contactUsLabel}
                  <span>{getIconFromIconName('arrowdown')}</span>
                </h3>
              </div>
              <Collapse in={open} className={styles.addressBoxContainer}>
                <div itemProp="address">
                  <p itemProp="description">{projectLocation?.address1}</p>
                  <p itemProp="description">{projectLocation?.address2}</p>
                  <p itemProp="description">
                    {projectLocation?.city} {projectLocation?.pincode ? '- ' : ''} {projectLocation?.pincode}
                  </p>
                  <p itemProp="description">
                    {projectLocation?.state} {projectLocation?.country ? ', ' : ''} {projectLocation?.country}
                  </p>
                  <p itemProp="description">{projectLocation?.contact}</p>
                </div>
              </Collapse>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectLocation;
