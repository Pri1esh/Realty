import { CustomImage } from '@components';
import { IVideoCarouselWithThumbnails } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Slider from 'react-slick';
import styles from './VideoCarouselWithThumbnails.module.scss';

const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

function Arrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {getIconFromIconName('arrowdown')}
    </div>
  );
}

function VideoCarouselWithThumbnails(props: IVideoCarouselWithThumbnails) {
  const { modalslidesData, galleryTabs, activeTab } = props;
  const slidesData = modalslidesData?.gallerydata;
  const [main, setMain] = useState<any>(null);
  const [thumb, setThumb] = useState<any>(null);
  const [sliderMain, setsliderMain] = useState<any>(null);
  const [sliderThumb, setsliderThumb] = useState<any>(null);
  const [IsEnquireActive, setIsEnquireActive] = useState<boolean>(false);
  const [tabkey, setTabKey] = useState<string | undefined>(activeTab || 'video');
  const [slidefilter, setSlidefilter] = useState<string | undefined>(activeTab || 'video');
  const { deviceType } = useDeviceType();
  const [current, setCurrent] = useState<number>(-1);
  const videoRef = useRef<any>();

  useEffect(() => {
    setTabKey(activeTab);
    setSlidefilter(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMain(sliderMain);
    setThumb(sliderThumb);
    const idx = slidesData?.findIndex((slide: { tabType: string }) => slide.tabType === slidefilter);

    sliderMain?.slickGoTo(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidefilter, sliderMain, sliderThumb]);

  const getYouTubeSrc = (src: string, key: number) => {
    if (key === current) {
      return src;
    }
    return '';
  };

  const pauseBackgroundVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const afterChangeHandler = (currentSlide: any) => {
    const tabKeys: string[] = [];
    slidesData?.map((item: { tabType: string }) => {
      tabKeys.push(item?.tabType);
    });
    setTabKey(tabKeys[currentSlide]);
    tabKeys[currentSlide] === 'enquirenow' ? setIsEnquireActive(true) : setIsEnquireActive(false);
  };

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    asNavFor: '.slider-nav',
    centerMode: true,
    centerPadding: '15%',
    className: 'slider center',
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    beforeChange: function (prev: number, curr: number) {
      pauseBackgroundVideo();
      setCurrent(curr);
    },
    responsive: [
      {
        breakpoint: 1199,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, centerPadding: '0px', arrows: false },
      },
    ],
  };

  const settingsThumbs = {
    slidesToShow: 12,
    centerMode: false,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    infinite: false,
    responsive: [
      {
        breakpoint: 1999,
        settings: { slidesToShow: 12 },
      },
      {
        breakpoint: 1499,
        settings: { slidesToShow: 10 },
      },
      {
        breakpoint: 1199,
        settings: { slidesToShow: 8 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 3, centerPadding: '0px' },
      },
    ],
  };
  const getComponent = (slide: any, key: number) => {
    switch (true) {
      case slide?.datatype === 'video':
        return (
          <video
            itemProp="video"
            preload="metadata"
            controls
            poster={deviceType === 'mobile' ? slide?.posterMobile || slide?.poster : slide?.poster}
            id="propertyVideo"
            ref={key === current ? videoRef : null}
          >
            <source src={slide.videomp4 + '#t=0.001'} type="video/mp4" />
            <source src={slide.videoogg + '#t=0.001'} type="video/ogg" />
          </video>
        );
      case slide?.datatype === 'gallery':
        return (
          <div className={styles.slide_wrapper_gallery}>
            <div className={styles.thumbWrapper}>
              <CustomImage
                itemProp="image"
                src={deviceType === 'mobile' ? slide?.posterMobile || slide?.poster : slide?.poster}
                alt={slide.posterAlt}
                title={slide.imgtitle}
              />
              <span itemProp="description">{slide.thumbtitle}</span>
            </div>
            <label className={styles.slick_slide_label}>{slide.label}</label>
          </div>
        );
      case slide?.datatype === 'videotour':
        return (
          <div className={styles.slide_wrapper_videotour}>
            <div className={styles.slide_wrapper_videotour_thumb}>
              <CustomImage
                itemProp="image"
                src={deviceType === 'mobile' ? slide?.posterMobile || slide?.poster : slide?.poster}
                alt={slide.posterAlt}
              />
            </div>
            <iframe itemProp="associatedMedia" src={slide?.iframeurl} sandbox="allow-scripts allow-same-origin" />
          </div>
        );
      case slide?.datatype === 'youtubevideo':
        return (
          <div className={styles.slide_wrapper_youtubevideo}>
            <iframe
              itemProp="associatedMedia"
              src={getYouTubeSrc(slide?.iframeurl, key)}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        );
      case slide?.datatype === 'enquirenow':
        return (
          <div className={styles.wrapper_enquirenow}>
            <div itemProp="potentialAction" className={styles.slide_wrapper_enquirenow}>
              <EnquiryFormHelper typeDropdown={false} configuration={false} doubleColumn={false} singleColumn={true} />
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <div itemProp="mainEntityOfPage" className={styles.slider_wrapper}>
      <div className={styles.modalNavTabs}>
        <Nav defaultActiveKey={tabkey}>
          {galleryTabs?.data.map(
            (tab: { link?: string; title?: string; tabtypecount?: string | number }, id: number) => (
              <Nav.Item
                itemProp="potentialAction"
                data-type={tab?.link}
                className={tabkey === tab?.link ? 'active' : ''}
                onClick={() => {
                  setSlidefilter(tab?.link);
                  setTabKey(tab?.link);
                  setsliderThumb(tab?.link);
                }}
                key={`${(tab?.link ?? '') + id}`}
              >
                <Nav.Link eventKey={tab.link}>{`${tab?.title} ${
                  tab?.link !== 'enquirenow' ? `(${tab?.tabtypecount})` : ''
                }`}</Nav.Link>
              </Nav.Item>
            ),
          )}
        </Nav>
      </div>
      <div itemProp="hasPart" className={styles.propertySlider}>
        <Slider
          {...settingsMain}
          asNavFor={thumb}
          ref={(slider) => setsliderMain(slider)}
          afterChange={afterChangeHandler}
        >
          {slidesData?.map((slide: any, index: number) => (
            <div className={styles.slide_wrapper} key={slide.id} data-type={slide?.datatype}>
              {getComponent(slide, index)}
            </div>
          ))}
        </Slider>
      </div>

      <div className={`thumbnailSliderWrap ${IsEnquireActive && 'EnquireActive'} `}>
        <div className={styles.thumbnail_slider_wrap}>
          <Slider {...settingsThumbs} asNavFor={main} ref={(slider) => setsliderThumb(slider)}>
            {slidesData?.map((slide: any) => (
              <div itemProp="associatedMedia" className={styles.slick_slide} key={slide.id}>
                <CustomImage
                  itemProp="image"
                  className={styles.slick_slide_image}
                  src={deviceType === 'mobile' && slide.thumbsrcmobile ? slide.thumbsrcmobile : slide.thumbsrc}
                  alt={slide.thumbalt}
                  title={slide.thumbtitle}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default VideoCarouselWithThumbnails;
