import { getIconFromIconName } from '@utils';
import { useEffect, useState } from 'react';
import styles from './projectHiglightsItem.module.scss';

const ProjectHiglightsItem = (props: any) => {
  const { currGalleryIcon, id } = props;
  const [readMore, setReadMore] = useState(false);
  const [currID, setCurrID] = useState<number>(-1);
  const [textLength, setTextLength] = useState('');
  const trimmedText = currGalleryIcon?.type?.substring(0, textLength);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setTextLength('80');
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setTextLength('30');
    } else {
      setTextLength('60');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div itemProp="description" className={styles.highlightsDescription}>
      <span itemProp="associatedMedia">{getIconFromIconName(currGalleryIcon?.icon)}</span>
      <div>
        <p className={styles.heading} itemProp="headline">
          {currGalleryIcon?.label}
        </p>
        <p className={styles.subText}>
          <span className={styles.trimData} itemProp="description" dangerouslySetInnerHTML={{ __html: trimmedText }} />
          {!readMore && currGalleryIcon?.type.length > textLength && <> ... </>}
          <span
            itemProp="description"
            className={`${readMore ? '' : 'd-none'}`}
            dangerouslySetInnerHTML={{
              __html: currGalleryIcon?.type?.substring(textLength, currGalleryIcon?.type?.length),
            }}
          />
          {currGalleryIcon?.type.length > textLength && (
            <a
              href="javascript: void(0)"
              onClick={() => {
                setReadMore(!readMore);
                setCurrID(id);
              }}
              className={styles.btnReadMore}
            >
              {readMore && id === currID ? (
                <>
                  Less
                  {getIconFromIconName('ArrowUp')}
                </>
              ) : (
                <>
                  More
                  {getIconFromIconName('arrowdown')}
                </>
              )}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};
export default ProjectHiglightsItem;
