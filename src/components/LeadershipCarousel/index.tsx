import { Carousel, LeaderShip } from '@components';
import { ILeaderShipCarousel, ILeaderShipCarouselList } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './LeadershipCarousel.module.scss';
const LeaderShipCarousel = (props: ILeaderShipCarouselList) => {
  const { LeadersData } = props;
  return (
    <div className="section-row">
      <div className={styles.sectionleadershipspeak}>
        <h2 itemProp="name">
          {getIconFromIconName('Quotation')}
          {LeadersData?.params?.ComponentTitle || LeadersData?.fields?.title}
        </h2>
        <Carousel
          className=""
          classes=""
          isMobSlider
          settings={{
            arrows: true,
            autoplay: false,
            autoplaySpeed: 2000,
            dots: false,
            infinite: false,
            pauseOnHover: false,
            slidesToScroll: 1,
            slidesToShow: 3.4,
            speed: 1200,
            swipe: true,
            responsive: [
              {
                breakpoint: 1199,
                settings: { slidesToShow: 3.3 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, dots: true, arrows: false },
              },
              {
                breakpoint: 500,
                settings: { slidesToShow: 1.2, dots: true, arrows: false },
              },
            ],
          }}
        >
          <>
            {LeadersData?.fields?.data.map((item: ILeaderShipCarousel, index: number) => (
              <LeaderShip
                quote={item.quote}
                src={item.src}
                imgalt={item.imgalt}
                imgtitle={item.imgtitle}
                name={item.name}
                designation={item.designation}
                key={`${item.src + index}`}
              />
            ))}
          </>
        </Carousel>
      </div>
    </div>
  );
};

export default LeaderShipCarousel;
