import { SearchProject } from '@components';
import { useEffect, useState } from 'react';
import styles from './stickySearchProject.module.scss';

const StickySearchProject = (props: { searchData: any }) => {
  const { searchData } = props;
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', setSearchSticky);

    return () => {
      window.removeEventListener('scroll', setSearchSticky);
    };
  }, []);

  const setSearchSticky = () => {
    if (window.scrollY > 140) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div
      className={`d-lg-block d-none ${styles.stickySearchWidget} ${
        active ? styles.stickySearchWidgetActive : styles.stickySearchWidgetInner
      }`}
    >
      <SearchProject searchProjectData={searchData} />
    </div>
  );
};

export default StickySearchProject;
