import { CustomImage } from '@components';
import { IHomeCityProjectDetails, IHomeCityProjectDetailsList } from '@interfaces';
import { useEffect, useRef } from 'react';
import styles from './homeCityProjectDetails.module.scss';

const HomeCityProjectDetails = (props: IHomeCityProjectDetailsList) => {
  const { projectcitydata } = props;
  const myref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          el[0].target.classList.add(`${styles.projectLocation}`);
        }
      },
      { threshold: 0.1 },
    );

    myref.current && observer.observe(myref.current);
  }, []);

  return (
    <div className={styles.blockmain} itemScope itemType="https://schema.org/ItemList">
      <div className={styles.row} ref={myref}>
        {projectcitydata?.map((data: IHomeCityProjectDetails, key: number) => (
          <div itemProp="itemListElement" key={`${data?.link + key}`} className={styles.col}>
            <div itemProp="itemListElement" className={styles.cardblock} key={`${data?.link + key}`}>
              <a itemProp="url" href={data?.link}>
                <div itemProp="itemListElement" className={styles.cardblockthumb}>
                  <CustomImage
                    itemProp="image"
                    src={data?.src}
                    alt={data?.imgAlt || data?.location}
                    title={data?.imgtitle}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    className="imgBackground"
                  />
                </div>
                <div className={styles.cardblockdescription}>
                  <h3 itemProp="name">{data?.location}</h3>
                  <h4 itemProp="description">{data?.projectcount}</h4>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeCityProjectDetails;
