import { Carousel, CustomImage } from '@components';
import { IExploreShantigram } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './ExploreShantigram.module.scss';

const ExploreShantigram = (props: IExploreShantigram) => {
  const { deviceType } = useDeviceType();
  const { highlights } = props;
  const CardItem = (
    <div className={styles.cards}>
      {highlights?.fields?.cards?.map((item: any, index: number) => (
        <div className={styles.card} key={`${item?.title + index}`}>
          <a href={item?.cardLink} target={item?.target}>
            <div className={styles.flipCard}>
              <div className={styles.cardFrontWrapper}>
                {item?.frontImage && <CustomImage src={item?.frontImage} alt={item?.imageAlt} itemProp="image" />}
                {item?.title && <p itemProp="headline">{item?.title}</p>}
              </div>
              <div className={styles.cardBackWrapper}>
                {item?.backImage && <CustomImage src={item?.backImage} alt={item?.backImageAlt} itemProp="image" />}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {deviceType === 'desktop' ? (
        <>
          {CardItem}
          <div className={styles.disclaimer} itemProp="name">
            {highlights?.fields?.disclaimer}
          </div>
        </>
      ) : (
        <div>
          <Carousel
            className=""
            classes=""
            isMobSlider
            settings={{
              arrows: false,
              autoplay: false,
              autoplaySpeed: 2000,
              dots: false,
              infinite: false,
              pauseOnHover: false,
              slidesToScroll: 1,
              slidesToShow: 3,
              speed: 500,
              swipe: true,
              responsive: [
                {
                  breakpoint: 500,
                  settings: { slidesToShow: 1.2 },
                },
              ],
            }}
          >
            {CardItem}
          </Carousel>
          <div className={styles.disclaimer} itemProp="name">
            {highlights?.fields?.disclaimer}
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreShantigram;
