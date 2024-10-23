import styles from './preFooter.module.scss';

const PreFooter = (props: { compData: any }) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.preFooter}>
        <h6>{compData?.heading}</h6>
        {compData?.items?.map((item: any, index: number) => (
          <>
            <div className={styles.item} key={index}>
              <a href={item?.linkUrl} target={item?.target}>
                {item?.linkTitle}
                <span>|</span>
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PreFooter;
