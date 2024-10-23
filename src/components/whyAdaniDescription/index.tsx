import { IWhyAdaniDescription } from '@interfaces';
import React, { useEffect } from 'react';
import styles from './whyAdaniDescription.module.scss';

const WhyAdaniDescription = (props: IWhyAdaniDescription) => {
  const { heading } = props;
  const myref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          el[0].target.classList.add(`${styles.whyAdaniAnimate}`);
        } else {
          el[0].target.classList.remove(`${styles.whyAdaniAnimate}`);
        }
      },
      { threshold: 0.1 },
    );

    myref.current && observer.observe(myref.current);
  }, []);
  return (
    <div className={styles.blockmain} ref={myref}>
      <div className={styles.whyushighlights}>
        <p itemProp="description">{heading}</p>
      </div>
    </div>
  );
};
export default WhyAdaniDescription;
