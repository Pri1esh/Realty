import { IQuicklinksData, IQuicklinksOffCanvas, IQuicklinksPageData } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './quicklinks.module.scss';
const QuicklinksOffCanvas = (props: IQuicklinksOffCanvas) => {
  const { pageData, setShow, setOpen, open, isSelected, setIsSelected, links } = props;

  const getLink = (keys: any) => {
    if (keys.toLowerCase().includes('disclaimer')) {
      return getCurrLink('disclaimer');
    } else if (keys.toLowerCase().includes('terms')) {
      return getCurrLink('terms');
    } else if (keys.toLowerCase().includes('privacy')) {
      return getCurrLink('privacy');
    } else if (keys.toLowerCase().includes('cookie')) {
      return getCurrLink('cookie');
    } else if (keys.toLowerCase().includes('faqs')) {
      return getCurrLink('faqs');
    } else {
      return '';
    }
  };

  const SelectedTab = (item: string) => {
    setIsSelected(item);
  };
  const getCurrLink = (key: string) => {
    let link = '';
    links?.map((item: IQuicklinksData) => {
      if (item?.heading?.toLowerCase().includes(key)) {
        link = item?.link;
      }
    });
    return link;
  };

  return (
    <div className={styles.quicklinks}>
      <ul>
        {pageData.map((item: IQuicklinksPageData) => {
          return Object.keys(item).map((keys, index: number) => {
            return (
              <li
                key={`${item[keys]?.heading + index}`}
                onClick={() => {
                  setShow(false);
                  setOpen(!open);
                  SelectedTab(keys);
                }}
              >
                <a
                  itemProp="potentialAction"
                  className={`${keys == isSelected ? styles.active : styles.notActive}`}
                  href={getLink(keys)}
                >
                  {item[keys]?.heading}
                </a>
                <span className={`${keys == isSelected ? 'active' : styles.notActive}`}>
                  {getIconFromIconName('Tick')}
                </span>
              </li>
            );
          });
        })}
      </ul>
    </div>
  );
};

export default QuicklinksOffCanvas;
