import { Breadcrumb } from '@components';
import { IBreadcrumb } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = (props: IBreadcrumb) => {
  const { list, showOnMobile = false, classname = '' } = props;
  const { deviceType } = useDeviceType();

  const getBreadcrumbs = () => {
    switch (true) {
      case deviceType === 'desktop' && !showOnMobile:
        return (
          <div className={`${styles.sectionBreadcrumb} ${classname}`}>
            <Breadcrumb list={list} />
          </div>
        );

      case showOnMobile && deviceType !== 'desktop':
        return (
          <div className={`${styles.mobileBreadcrumb} ${classname}`}>
            <Breadcrumb list={list} showOnMobile={showOnMobile} />
          </div>
        );
      default:
        return <></>;
    }
  };

  return getBreadcrumbs();
};

export default Breadcrumbs;
