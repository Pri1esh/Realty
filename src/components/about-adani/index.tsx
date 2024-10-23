import { Button, SectionHeader } from '@components';
import { IAboutAdani } from '@interfaces';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './about-adani.module.scss';

const AboutAdani = (props: IAboutAdani) => {
  const { aboutData, readmore = 'Read More', readless = 'Read Less', description = '' } = props;
  const [open, setOpen] = useState(false);
  const details = aboutData?.about || aboutData?.description || aboutData?.content;

  return (
    <div itemProp="about">
      {aboutData?.heading && <SectionHeader itemProp="headline" heading={aboutData?.heading} />}
      {details && <div itemProp="mainEntity" className={styles.text} dangerouslySetInnerHTML={{ __html: details }} />}
      {aboutData?.readMore && (
        <Collapse in={open}>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: aboutData?.readMore }} />
        </Collapse>
      )}
      {aboutData?.readMore && (
        <Button
          onClick={() => setOpen(!open)}
          className="seeMore p-0 border-radius-0"
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="link"
          ripple="false"
        >
          {open ? <>{readless}</> : <>{readmore}</>}
        </Button>
      )}

      {aboutData?.terms && (
        <ul className={styles.tncText}>
          <li>
            {aboutData?.terms}{' '}
            {aboutData?.detailLink && aboutData?.links && <a href={aboutData?.links}>{aboutData?.detailLink}</a>}
          </li>
          <li>{aboutData?.extrCharges}</li>
        </ul>
      )}
      {description && (
        <div itemProp="about" className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
};

export default AboutAdani;
