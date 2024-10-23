import { IconButton } from '@components';
import { ISearchData, ISearchDropdown } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './SearchDropdown.module.scss';
const SearchDropdown = (props: ISearchDropdown) => {
  const { inputValue = '', setinputValue, openSearch = false, setOpenSearch, searchData } = props;

  const inputRef = React.useRef<any>(null);
  const searchInputRef = React.useRef<any>(null);
  const suggestionRef = React.useRef<any>(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (e: any) => {
    if (
      searchInputRef?.current &&
      !searchInputRef?.current?.contains(e.target) &&
      !suggestionRef?.current?.contains(e.target)
    ) {
      setinputValue && setinputValue('');
      setOpenSearch && setOpenSearch(false);
    }
  };

  return (
    <div itemScope itemType="https://schema.org/Article">
      <Dropdown
        className="navItem"
        align="end"
        onClickCapture={() => {
          setOpenSearch && setOpenSearch(true);
        }}
        show={openSearch}
      >
        <Dropdown.Toggle variant="light" as="a" className="basicDropdown icon-button" id="airport_guide">
          <IconButton onClick={handleFocus} itemProp="potentialAction">
            {getIconFromIconName('blogsearch')}
          </IconButton>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.searchLayer}>
          <div className={styles.searchBox} ref={searchInputRef}>
            {getIconFromIconName('blogsearch')}
            <input
              type="text"
              ref={inputRef}
              className={styles.searchBox__field}
              placeholder="Search"
              value={inputValue}
              onChange={(e) => {
                setinputValue && setinputValue(e.target.value);
              }}
              itemProp="potentialAction"
            />
            <IconButton
              onClick={() => {
                setinputValue && setinputValue('');
                setOpenSearch && setOpenSearch(false);
              }}
              itemProp="potentialAction"
            >
              {getIconFromIconName('Close')}
            </IconButton>
          </div>
          {inputValue?.length > 2 && (
            <div className={styles.searchSuggester} ref={suggestionRef}>
              <ul>
                {searchData && searchData.length
                  ? searchData?.map((item: ISearchData, key: React.Key | null | undefined) => {
                      return (
                        <li key={`${item?.slug + key}`} itemProp="disambiguatingDescription">
                          {item.slug && (
                            <a href={`${item?.slug}`} itemProp="url">
                              {item.role}
                            </a>
                          )}
                        </li>
                      );
                    })
                  : inputValue.length > 2 && <li itemProp="disambiguatingDescription">No result found</li>}
              </ul>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default SearchDropdown;
