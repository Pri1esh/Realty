import { CustomImage, ModalPopup, Specification } from '@components';
import { IProjectUnitPlans } from '@interfaces';
import { isTouchScreendevice, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import styles from './projectUnitPlans.module.scss';

const ProjectUnitPlans = (props: IProjectUnitPlans) => {
  const {
    projectDetails,
    src,
    desc,
    title,
    imgAlt,
    handleModal,
    showUnitPlan,
    setShowUnitPlan,
    index,
    unitPlanIndex,
    setUnitPlanIndex,
  } = props;

  const buttonRef = useRef<any>(null);

  const [scrollTo, setScrollTo] = useState(0);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    if ((typeof window !== 'undefined' && window.innerWidth > 1366) || !isTouchScreendevice()) return;
    if (showUnitPlan && index === unitPlanIndex) {
      document.querySelector('body')?.classList.add('posFixed');
    } else if (!showUnitPlan && index === unitPlanIndex) {
      document.querySelector('body')?.classList.remove('posFixed');
    }

    if (showUnitPlan && index === unitPlanIndex) {
      window.scrollTo(0, -1);
      document.documentElement.style.scrollBehavior = 'auto';
    } else if (!showUnitPlan && index === unitPlanIndex) {
      window.scrollTo(0, scrollTo);
      document.documentElement.style.scrollBehavior = 'smooth';
      setUnitPlanIndex(-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUnitPlan]);

  const onHideSpecificationPopup = () => {
    setShowUnitPlan(false);
  };
  return (
    <div className={styles.unitPlans}>
      <h3 itemProp="headline">{title}</h3>
      <p itemProp="description">{desc}</p>
      <div className={styles.unitPlansThumb}>
        <CustomImage
          itemProp="image"
          src={src ? src : ''}
          alt={imgAlt ? imgAlt : 'Adani Realty'}
          className="imgBackground"
        />
      </div>
      <Button
        itemProp="potentialAction"
        variant="primary"
        onClick={() => {
          handleModal(index);
          setScrollTo(window.scrollY);
        }}
        ref={buttonRef}
        onFocus={buttonRef?.current?.blur()}
      >
        Specifications
      </Button>
      {deviceType === 'desktop' ? (
        <ModalPopup
          modalTitle=""
          className={styles.specsPopup}
          show={unitPlanIndex === index ? showUnitPlan : false}
          onHide={onHideSpecificationPopup}
          modalSize="lg"
          modalBody={<Specification projectDetails={projectDetails} />}
        />
      ) : (
        <Offcanvas
          placement="bottom"
          show={unitPlanIndex === index ? showUnitPlan : false}
          onHide={onHideSpecificationPopup}
          className={styles.unitPlanMobile}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Specification projectDetails={projectDetails} />
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </div>
  );
};
export default ProjectUnitPlans;
