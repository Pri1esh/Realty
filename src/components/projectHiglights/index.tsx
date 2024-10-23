import { CustomImage, GalleryModal, ProjectNameMobile, ReraData } from '@components';
import { IGalleryHighlightsData, IProjectHighlights } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useState } from 'react';
import { Figure } from 'react-bootstrap';
import ProjectHiglightsItem from '../projectHiglightsItem';
import styles from './projecthighlights.module.scss';

const ProjectHighlights = (props: IProjectHighlights) => {
  const { projectNameData, projectHighlights, galleryModalData, galleryHighlights, eventAnalyticsHandler } = props;
  const { deviceType } = useDeviceType();

  const [show, setShow] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (tabType: string) => {
    setActiveGalleryTab(tabType);
    setShow(true);
  };

  const getSrc = (currFigure: IGalleryHighlightsData) => {
    switch (true) {
      case deviceType === 'mobile' && currFigure?.srcMobile !== '':
        return currFigure?.srcMobile ?? '';
      case currFigure?.logoSrc !== '':
        return currFigure?.logoSrc ?? '';
      case currFigure?.src !== '':
        return currFigure?.src ?? '';
      default:
        return '';
    }
  };

  const getGalleryHighlight = (currFigure: IGalleryHighlightsData, key: number) => {
    switch (currFigure?.type) {
      case 'propertyLogo':
        return (
          <div
            itemProp="mainEntity"
            className={styles.sectionHighlightsHalf}
            key={`${currFigure?.srcMobile ?? '' + key}`}
          >
            <Figure className={styles.highlightsThumb} onClick={() => handleShow(currFigure?.tabType)}>
              <CustomImage
                itemProp="image"
                src={getSrc(currFigure)}
                alt={currFigure?.imgAlt}
                className="imgBackground"
                fetchpriority="high"
              />
              <div itemProp="encodesCreativeWork" className={styles.propertyLogo}>
                <CustomImage itemProp="image" src={currFigure?.src ? currFigure?.src : ''} alt={currFigure?.imgAlt} />
              </div>
              <p itemProp="description">{currFigure?.logoTitle}</p>
              {currFigure?.imgCount && (
                <span itemProp="associatedMedia" className={styles.gallery}>
                  {getIconFromIconName(currFigure?.icon)}
                  {currFigure?.imgCount}
                </span>
              )}
            </Figure>
          </div>
        );

      case 'tour360':
        return (
          <div itemProp="mainEntity" className={`${styles.sectionHighlightsHalf} ${styles.sectionSpacing}`} key={key}>
            <Figure className={styles.tour360} onClick={() => handleShow(currFigure?.tabType)}>
              <CustomImage
                itemProp="image"
                src={getSrc(currFigure)}
                alt={currFigure?.imgAlt}
                className="imgBackground"
              />
              {currFigure?.iconDesc && (
                <p itemProp="about">
                  <span itemProp="associatedMedia">
                    {getIconFromIconName(currFigure?.icon)}
                    {currFigure?.iconDesc}
                    <sup>{currFigure?.degree}</sup>
                  </span>
                </p>
              )}
            </Figure>
          </div>
        );

      case 'projectStatus':
        return (
          <div itemProp="mainEntity" className={styles.sectionHighlightsHalf} key={key}>
            <Figure
              className={`${styles.highlightsThumb} ${styles.projectStatus}`}
              onClick={() => handleShow(currFigure?.tabType)}
            >
              <CustomImage
                itemProp="image"
                src={getSrc(currFigure)}
                alt={currFigure?.imgAlt}
                className="imgBackground"
              />
              {currFigure?.logoTitle && (
                <p itemProp="about">
                  <span itemProp="associatedMedia">
                    {getIconFromIconName(currFigure?.icon)}
                    {currFigure?.logoTitle}
                  </span>
                </p>
              )}
            </Figure>
          </div>
        );

      case 'video':
        return (
          <div itemProp="mainEntity" className={styles.sectionHighlightsHalf} key={key}>
            <Figure
              className={`${styles.highlightsThumb} ${styles.projectStatus}`}
              onClick={() => handleShow(currFigure?.tabType)}
            >
              <CustomImage
                itemProp="image"
                src={currFigure?.src ? currFigure?.src : ''}
                alt={currFigure?.imgAlt}
                className="imgBackground"
              />
              {currFigure?.logoTitle && (
                <p>
                  <span itemProp="associatedMedia">
                    {getIconFromIconName(currFigure?.icon)}
                    {currFigure?.logoTitle}
                  </span>
                </p>
              )}
            </Figure>
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <div>
      <div itemScope itemType="https://schema.org/MediaObject" className={styles.sectionFeatures}>
        <div className={styles.sectionHighlights}>
          {galleryHighlights?.map((currFigure: IGalleryHighlightsData, key: number) =>
            getGalleryHighlight(currFigure, key),
          )}
        </div>
      </div>

      {deviceType === 'desktop' ? (
        <></>
      ) : (
        <>
          <ProjectNameMobile projectNameData={projectNameData} />
          {projectHighlights?.reraData &&
            projectHighlights?.reraData[0] &&
            projectHighlights?.reraData[0]?.reraModal &&
            projectHighlights?.reraData[0]?.reraModal[0]?.reraid !== undefined &&
            projectHighlights?.reraData[0]?.reraModal[0]?.reraid !== null && (
              <ReraData reraInfo={projectHighlights?.reraData[0]} />
            )}
        </>
      )}

      <div itemProp="creativeWorkStatus" className={styles.ProjectHighlightsMain}>
        {projectHighlights?.galleryIconsData?.map(
          (
            currGalleryIcon: {
              icon: string;
              label: string;
              type: string;
            },
            key: number,
          ) => {
            return (
              <ProjectHiglightsItem
                currGalleryIcon={currGalleryIcon}
                id={key}
                key={`${currGalleryIcon?.label + key}`}
              />
            );
          },
        )}
      </div>

      <GalleryModal
        show={show}
        handleClose={handleClose}
        title={galleryModalData?.title}
        share={galleryModalData?.share}
        videoCarouselData={galleryModalData?.videoCarouselData}
        closelink={galleryModalData?.closelink}
        sharelink={galleryModalData?.sharelink}
        modalShare={galleryModalData?.modalShare}
        activeTab={activeGalleryTab}
        eventAnalyticsHandler={eventAnalyticsHandler}
      />
    </div>
  );
};
export default ProjectHighlights;
