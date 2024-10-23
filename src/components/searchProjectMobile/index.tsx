import { Button } from '@components';
import { ISearchProjectMobile } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { Container } from 'react-bootstrap';
import styles from './searchProjectMobile.module.scss';

const SearchProjectMobile = (props: ISearchProjectMobile) => {
  const {
    search = 'Search',
    handleClick = () => {
      /* do nothing */
    },
    mobActive,
    reference,
  } = props;
  const getClass = () => {
    if (mobActive) {
      return ` 'd-lg-none d-block' ${styles.stickySearchWidgetMob} `;
    } else return 'd-lg-none d-block';
  };
  return (
    <div className={getClass()} ref={reference}>
      <div className={styles.searchbox}>
        <Container>
          <div className={styles.mobilesearch}>
            <Button size="sm" variant="outline-dark" className="normalSearch" onClick={handleClick}>
              {getIconFromIconName('Search')}
              {search}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default SearchProjectMobile;
