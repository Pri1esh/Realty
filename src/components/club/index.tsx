import { Button, Carousel, CustomImage } from '@components';
import { IClubSection } from '@interfaces';
import { useDeviceType } from '@utils';
import { useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './club.module.scss';

const ClubSection = (props: IClubSection) => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType == 'mobile';
  const { clubData } = props;

  const sliderRefClubData = useRef<any>(null);
  const { sendEvent } = useGTM();

  const slidersetting = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    fade: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    margin: 0,
    padding: 0,
    onInit: function () {
      document.querySelector('#clubDataProgress .item:nth-child(1)')?.classList.add('active');
    },
    beforeChange: function (current: number, next: number) {
      if (current === next) return;
      document.querySelector('#clubDataProgress .item.active')?.classList.remove('active');
      document.querySelectorAll('#clubDataProgress .item')[next]?.classList.add('active');
    },
    responsive: [
      {
        breakpoint: 1199,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };
  const eventAnalyticsHandler = (heading: string) => {
    const eventVal = {
      event: 'explore_more',
      category: 'realty',
      sub_category: 'Club Slider',
      page_type: 'home',
      click_text: 'Explore',
      project_type: 'Club',
      property_type: heading ? heading : '',
    };
    sendEvent(eventVal);
  };

  return (
    <div className={styles.sectionClubs}>
      <div className={styles.slidermain} itemScope itemType="https://schema.org/MediaObject" itemProp="hasPart">
        <Carousel carRef={sliderRefClubData} settings={slidersetting}>
          <>
            {clubData?.map(
              (
                data: {
                  imgtitle: string;
                  link: string;
                  src: string;
                  heading: string;
                  subheading: string;
                  ctatitle: string;
                  mobileimage: string;
                },
                key: number,
              ) => (
                <div className={styles.herobanner} key={`${data?.imgtitle + key}`}>
                  <div className={styles.herobannerthumb}>
                    <span itemProp="headline" className={styles.imgType}>
                      {data?.imgtitle}
                    </span>
                    <a itemProp="url" href={data?.link}>
                      <CustomImage
                        itemProp="image"
                        src={isMobile && data?.mobileimage ? data.mobileimage : data.src}
                        alt={data?.heading}
                        width={1}
                        height={0.45}
                        layout="responsive"
                        className="imgBackground"
                      />
                    </a>
                  </div>
                  <div className={styles.herobannercontent}>
                    <Container>
                      <Row>
                        <Col lg={10} md={9}>
                          <h2 itemProp="headline" className={styles.heroheading}>
                            {data?.heading}
                          </h2>
                          <p itemProp="text">{data?.subheading}</p>
                        </Col>
                        <Col lg={2} md={3} className={styles.clubBtn}>
                          <div className={styles.textright}>
                            <Button
                              itemProp="url"
                              href={data?.link}
                              variant="light"
                              onClick={() => eventAnalyticsHandler(data?.heading)}
                            >
                              {data?.ctatitle}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              ),
            )}
          </>
        </Carousel>

        <div className={styles.progressbar}>
          <Container>
            <div className={styles.progressBarContainer} id="clubDataProgress">
              {clubData?.map(
                (
                  item: {
                    title: string;
                  },
                  index: number,
                ) => (
                  <div
                    data-slick-index={index}
                    className="item"
                    key={`${item?.title + index}`}
                    onClick={() => sliderRefClubData?.current?.slickGoTo(index)}
                  >
                    <span className={styles.progressBar} />
                    <small itemProp="text">{item?.title}</small>
                  </div>
                ),
              )}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default ClubSection;
