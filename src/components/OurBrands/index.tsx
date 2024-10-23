import { CustomImage } from '@components';
import { IOurBrands, IOurBrandsList } from '@interfaces';
import React, { useEffect } from 'react';
import styles from './OurBrands.module.scss';

const OurBrands = (props: IOurBrandsList) => {
  const myref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          el[0].target.classList.add(styles.brandAnimation);
        }
      },
      { threshold: 0.1 },
    );

    myref.current && observer.observe(myref.current);
  }, []);

  const { ourBrandsData } = props;
  return (
    <div className={styles.blockmain}>
      <div className="row" ref={myref}>
        {ourBrandsData?.map((data: IOurBrands, key: number) => (
          <div key={`${data?.src + key}`} className={`${styles.col}`}>
            <div className={styles.cardblock}>
              <CustomImage src={data.src} alt={data.alt} title={data.title} itemProp="image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurBrands;
