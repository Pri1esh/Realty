import { CustomImage, ModalPopup, Offcanvas, OffcanvasHeading, VerticalTabs } from '@components';
import { IFloorPlanData, IProjectFloorPlan } from '@interfaces';
import { isTouchScreendevice, useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import { Figure } from 'react-bootstrap';
import Pointer from '../projectMasterLayout/Pointer';
import styles from './projectFloorPlan.module.scss';

const ProjectFloorPlan = (props: IProjectFloorPlan) => {
  const { floorPlanData } = props;
  const { deviceType } = useDeviceType();
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState<{ src: string; imgAlt?: string }>();
  const [scrollTo, setScrollTo] = useState(0);

  useEffect(() => {
    if ((typeof window !== 'undefined' && window.innerWidth > 1366) || !isTouchScreendevice()) return;
    if (show) {
      document.querySelector('body')?.classList.add('posFixed');
      window.scrollTo(0, -1);
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      document.querySelector('body')?.classList.remove('posFixed');
      window.scrollTo(0, scrollTo);
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const getFloorPlanData = () => {
    const floorData: { content: JSX.Element; key: string; title: string }[] = [];
    floorPlanData &&
      floorPlanData?.map((items: IFloorPlanData, key: number) =>
        floorData.push({
          content: (
            <>
              <div itemProp="associatedMedia" className={styles.propertyFloorPlan} key={`${items?.src + key}`}>
                <Figure>
                  <CustomImage
                    className="imgBackground"
                    itemProp="image"
                    src={items?.src}
                    alt={items?.imgAlt ? items?.imgAlt : 'Floor Plan'}
                    onClick={() => {
                      setShow(true);
                      setModalData(items);
                      setScrollTo(window.scrollY);
                    }}
                  />
                </Figure>
                {items?.points.map((point: { left: string; bottom: string; title: string }, index: number) => {
                  return (
                    <Pointer
                      key={`${point.left + point.bottom + index}`}
                      xVal={point.left}
                      yVal={point.bottom}
                      text={point.title}
                    />
                  );
                })}
              </div>
            </>
          ),
          key: `${items?.tabHeading}`,
          title: `${items?.tabHeading}`,
        }),
      );
    return floorData;
  };

  return (
    <>
      {floorPlanData?.length > 1 ? (
        <VerticalTabs
          className="scrollbar-x mb-4"
          horizontalTabView={true}
          isClick={true}
          defaultActiveKey={getFloorPlanData()[0].title}
          tabData={getFloorPlanData()}
          transition
        />
      ) : (
        <>
          <div itemProp="associatedMedia" className={styles.propertyFloorPlan}>
            <Figure>
              <CustomImage
                className="imgBackground"
                itemProp="image"
                src={floorPlanData[0]?.src}
                alt={floorPlanData[0]?.imgAlt}
                onClick={() => {
                  setShow(true);
                  setModalData(floorPlanData[0]);
                  setScrollTo(window.scrollY);
                }}
              />
            </Figure>
            {floorPlanData[0]?.points.map((point: { left: string; bottom: string; title: string }, index: number) => {
              return (
                <Pointer
                  key={`${point?.left + point?.bottom + index}`}
                  xVal={point.left}
                  yVal={point.bottom}
                  text={point.title}
                />
              );
            })}
          </div>
        </>
      )}
      {deviceType === 'desktop' ? (
        <ModalPopup
          modalTitle=""
          className={styles.modal}
          modalSize="xl"
          show={show}
          onHide={() => {
            setShow(!show);
          }}
          modalBody={
            <div itemProp="associatedMedia" className={styles.propertyFloorPlanThumb}>
              <CustomImage itemProp="image" src={modalData?.src ? modalData?.src : ''} alt={modalData?.imgAlt} />
            </div>
          }
          modalFooter={''}
        />
      ) : (
        <Offcanvas
          placement="bottom"
          showCanvas={show}
          onHide={() => setShow(false)}
          closeButton={true}
          bodySpacing={true}
          titleProps={{ className: 'mobile-offcanvas-title' }}
          header={<OffcanvasHeading></OffcanvasHeading>}
        >
          <div itemProp="associatedMedia" className={styles.propertyFloorPlanThumb}>
            <CustomImage itemProp="image" src={modalData?.src ? modalData?.src : ''} alt="Floor Plan" />
          </div>
        </Offcanvas>
      )}
    </>
  );
};
export default ProjectFloorPlan;
