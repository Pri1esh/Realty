import { Button, CustomImage } from '@components';
import { IBanner } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './mainbanner.module.scss';

const Banner = (props: { id: number; compData: IBanner; parent: string }) => {
  const { id, compData } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType == 'mobile';

  const isVideo = compData.isVideo;
  const [pageUrl, setPageUrl] = useState<string>('');
  const { sendEvent } = useGTM();

  useEffect(() => {
    const path: string | any =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');
  }, []);

  const eventAnalyticsHandler = () => {
    const eventVal = {
      event: 'know_more',
      category: 'realty',
      sub_category: props?.parent,
      page_type: pageUrl,
      click_text: compData?.linktitle,
      project_type: compData?.propertyType ? compData?.propertyType : '',
      property_type: compData?.propertyName ? compData?.propertyName : '',
    };
    sendEvent(eventVal);
  };

  const videoposter = isMobile && compData?.videoposterMobile ? compData?.videoposterMobile : compData?.videoposter;
  const videoMp4 = isMobile && compData?.videoMp4Mobile ? compData?.videoMp4Mobile : compData?.videoMp4;
  const videoOgg = isMobile && compData?.videoOggMobile ? compData?.videoOggMobile : compData?.videoOgg;

  if (isVideo == 'true') {
    return (
      <div itemScope itemType="https://schema.org/VideoObject" itemProp="video" className={styles.mainbanner}>
        <div className={styles.gradientBorder}></div>
        <video itemProp="video" autoPlay muted loop poster={videoposter} playsInline>
          <source itemProp="contentUrl" src={videoMp4} type="video/mp4" />
          <source itemProp="contentUrl" src={videoOgg} type="video/ogg" />
          <meta itemProp="uploadDate" content={compData?.uploadDate} />
          <meta itemProp="thumbnailUrl" content={videoposter} />
          <meta itemProp="description" content={compData?.seoDescription} />
          <meta itemProp="name" content={compData?.seoName} />
          <meta itemProp="contentUrl" content={videoMp4 || videoOgg} />
        </video>
        <div className={styles.videotype}>{compData?.imgtype}</div>
        <div className={styles.pageheading}>
          <div>
            <a itemProp="url" href={compData?.link}>
              <Container>
                <h2 itemProp="headline">
                  <span>{compData?.heading}</span>
                </h2>
                <p itemProp="text">{compData?.subheading}</p>
                {compData?.link && (
                  <Button variant="light" onClick={eventAnalyticsHandler}>
                    {compData?.linktitle}
                  </Button>
                )}
              </Container>
            </a>
          </div>
        </div>
      </div>
    );
  }
  {
    return (
      <div>
        <div itemScope itemType="https://schema.org/VideoObject" className={styles.mainbanner}>
          <div className={styles.imageitem}>
            <div className={styles.imageitemthumb}>
              <div className={styles.imgtype}>{compData.imgtype}</div>
              <CustomImage
                itemProp="image"
                src={isMobile && compData.srcMobile ? compData.srcMobile : compData.thumb}
                alt={compData.thumbalt}
                title={compData.thumbtitle}
                className="imgBackground"
                lazy={id > 2 ? 'false' : 'true'}
                fetchpriority={id > 2 ? 'low' : null}
              />
            </div>
            <div className={styles.imageitemcontent}>
              <Container>
                <a itemProp="url" href={compData.link} target={compData.linktarget ? compData.linktarget : '_self'}>
                  {compData.logo && (
                    <div className={styles.projectlogo}>
                      <CustomImage
                        itemProp="image"
                        src={compData.logo}
                        alt={compData.logoalt}
                        title={compData.logotitle}
                      />
                    </div>
                  )}
                  <h2 itemProp="headline">{compData.heading}</h2>
                  <p itemProp="text">
                    {compData.subheading}
                    <span>
                      {compData.propertyName && <b className={styles.propertyLocation}>{compData.propertyName}</b>}
                      {compData.rerano}
                    </span>
                  </p>
                  <Button
                    itemProp="url"
                    onClick={() => {
                      eventAnalyticsHandler();
                      typeof window !== 'undefined' &&
                        window.open(compData.link, compData.linktarget ? compData.linktarget : '_self');
                    }}
                  >
                    {compData?.linktitle}
                  </Button>
                </a>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Banner;
