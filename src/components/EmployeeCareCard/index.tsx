import { CustomImage } from '@components';
import { IEmployeeCareCard, IEmployeeCareCardItem } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { useEffect, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import styles from './EmployeeCareCard.module.scss';

const EmployeeCareCard = (props: IEmployeeCareCard) => {
  const { careerdata } = props;

  const customCar = useRef<any[]>([]);
  const cardWrap = useRef<any>();

  let i = 0;
  const len = careerdata.length;

  const nextSlide = () => {
    if (i == len - 1) {
      const slideList = document.querySelectorAll('.animateRight,.animateLeft');
      for (i = 0; i < slideList.length; i++) {
        slideList[i].classList.remove('animateRight', 'animateLeft');
      }
      i = 0;
    } else {
      customCar.current[i].classList.add('animateRight');
      i++;
    }
  };

  const prevSlide = () => {
    if (i == len - 1) {
      const slideList = document.querySelectorAll('.animateRight,.animateLeft');
      for (i = 0; i < slideList.length; i++) {
        slideList[i].classList.remove('animateRight', 'animateLeft');
      }
      i = 0;
    } else {
      customCar.current[i].classList.add('animateLeft');
      i++;
    }
  };

  useEffect(() => {
    let touchstartX = 0;
    let touchendX = 0;
    const checkDirection = () => {
      if (touchendX < touchstartX) prevSlide();
      if (touchendX > touchstartX) nextSlide();
    };
    cardWrap.current.addEventListener('touchstart', (e: any) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    cardWrap.current.addEventListener('touchend', (e: any) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.cardWrap} ref={cardWrap}>
      <span itemProp="potentialAction" className={styles.prevslide} onClick={prevSlide}>
        Prev
        {getIconFromIconName('ArrowLeft')}
      </span>
      {careerdata?.map((data: IEmployeeCareCardItem, key: number) => (
        <div
          key={`${data.src + key}`}
          data-key={key}
          ref={(element: any) => customCar.current.push(element)}
          style={{ zIndex: -key }}
          className={`${key == 0 ? 'current' : ''} ` + `${styles.EmployeeCardBody}`}
        >
          <CustomImage itemProp="image" src={data.src} className="img-fluid" alt={data.alt} />
          <div className={styles.slideData}>
            <CustomImage itemProp="image" src={data.logo} className={styles.CardIcon} alt={data.alt} />
            <h4 itemProp="headline">{data.heading}</h4>
            <p itemProp="description">{data.detail}</p>
          </div>
        </div>
      ))}
      <span itemProp="potentialAction" className={`${styles.nextslide}`} onClick={nextSlide}>
        Next
        {getIconFromIconName('ArrowLeft')}
      </span>
    </div>
  );
};
export default EmployeeCareCard;
