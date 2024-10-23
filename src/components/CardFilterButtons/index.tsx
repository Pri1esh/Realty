import { SearchDropdown } from '@components';
import { ICardFilterButtons } from '@interfaces';
import { timeout } from '@utils';
import { useEffect } from 'react';
import styles from './CardFilterButtons.module.scss';

const CardFilterButtons = (props: ICardFilterButtons) => {
  const {
    Anchors,
    filter,
    setfilter,
    searchInputValue = '',
    setsearchInputValue,
    openSearch = false,
    setOpenSearch,
    searchData,
    Id,
  } = props;

  useEffect(() => {
    timeout(
      () =>
        document.getElementById('activeFilter')?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center' }),
      100,
    );
  }, []);
  const getLink = (data: { link: string; title: string; slug: string }) => {
    if (filter === data?.link.replace('#', '') || filter === data?.title) {
      return styles.active;
    }
    return '';
  };
  return (
    <div className={styles.groupmain} itemScope itemType="https://schema.org/Article">
      <div className={styles.btngroup}>
        <ul className="filterbuttons">
          {Anchors?.map((data: { link: string; title: string; slug: string }, key: number) => (
            <li key={`${data?.link + key}`} id={filter === data?.link.replace('#', '') ? 'activeFilter' : ''}>
              <a
                className={`${styles.anchor} ${getLink(data)}`}
                href={data?.title === 'All' ? `/blogs` : data?.slug}
                target="_self"
                onClick={(e: any) => {
                  e.preventDefault();
                  timeout(() => (Id ? setfilter(Id) : setfilter(data.title)), 600);
                  if (typeof window !== 'undefined') {
                    window.location.href =
                      data?.title === 'All' ? `${process.env.NEXT_PUBLIC_STAGING_LINK}/blogs` : data?.slug;
                  }
                }}
              >
                {data.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filtersearch}>
        <SearchDropdown
          inputValue={searchInputValue}
          setinputValue={setsearchInputValue}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          searchData={searchData}
        />
      </div>
    </div>
  );
};
export default CardFilterButtons;
