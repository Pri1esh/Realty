import { FloatingInput } from '@components';
import { ISearchInput } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './SearchInput.module.scss';
const SearchInput = (props: ISearchInput) => {
  const { SearchFaqByString, onClearSearch, searchRef } = props;
  return (
    <div className={styles.search}>
      {getIconFromIconName('Search')}
      <FloatingInput
        isClear
        label="Search FAQs"
        onChange={SearchFaqByString}
        placeholder="Search FAQs"
        onClear={onClearSearch}
        inputRef={searchRef}
      />
    </div>
  );
};
export default SearchInput;
