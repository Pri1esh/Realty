import { IReadMore } from '@interfaces';
import { useState } from 'react';
import styles from './readmore.module.scss';

const ReadMore = (props: IReadMore) => {
  const { data, textLength = 0, readmore = 'Read More', readless = 'Read Less' } = props;
  const [readMore, setReadMore] = useState(false);
  const trimmedText = data?.substring(0, textLength);

  return (
    <div className={styles.ReadMore} itemProp="about">
      <p>
        <span itemProp="description" dangerouslySetInnerHTML={{ __html: trimmedText }} />
        <span
          itemProp="description"
          className={`${readMore ? '' : 'd-none'}`}
          dangerouslySetInnerHTML={{ __html: data?.substring(textLength, data?.length) }}
        />
        {!readMore && data?.length > textLength && <>...</>}
        {data?.length > textLength && (
          <>
            {' '}
            <a href="javascript: void(0)" onClick={() => setReadMore(!readMore)} className={styles.btnReadMore}>
              {readMore ? <>{readless}</> : <>{readmore}</>}
            </a>
          </>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
