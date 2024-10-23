import { ICarousel, ICarouselArrows } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';

const CarouselArrows: FC<ICarouselArrows> = (props) => {
  const { className, onClick, classes, arrowAutoId } = props;

  return (
    <div className={`${className} ${classes}`} data-auto-id={arrowAutoId} onClick={onClick}>
      {getIconFromIconName('arrowdown')}
    </div>
  );
};

const Carousel: FC<ICarousel> = (props) => {
  const { deviceType } = useDeviceType(props?.propDeviceType);
  const [settings, setSettings] = useState<any>({
    responsive: props?.settings?.responsive,
    infinite: props?.settings?.infinite ? true : false,
    slidesToShow: props?.settings?.slidesToShow ?? 3,
  });

  useEffect(() => {
    setSettings({
      responsive: [],
      dots: !props?.settings?.dots ? false : true,
      centerMode: props?.settings?.centerMode ? true : false,
      arrows: props?.settings?.arrows ? true : false,
      infinite: !props?.settings?.infinite ? false : true,
      slidesToShow: props?.settings?.slidesToShow ?? 3,
      slidesToScroll: props?.settings?.slidesToScroll ?? 1,
      autoplay: !props?.settings?.autoplay ? false : true,
      dotsClass: 'slick-dots slick-thumb',
      speed: props?.settings?.speed ?? 1000,
      swipe: !props?.settings?.swipe ? false : true,
      pauseOnHover: !props?.settings?.pauseOnHover ? false : true,
      autoplaySpeed: props?.settings?.autoplaySpeed ?? 1000,
      nextArrow: (
        <CarouselArrows classes={`${props.settings?.arrowClasses}`} arrowAutoId={props?.settings?.forwardArrowAutoId} />
      ),
      prevArrow: (
        <CarouselArrows
          classes={`${props.settings?.arrowClasses}`}
          arrowAutoId={props?.settings?.backwardArrowAutoId}
        />
      ),
      ...props.settings,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props?.isMobSlider && deviceType !== 'desktop' ? (
        <div className={`mobSlider scrollbar-x ${props.ulClassName ? props.ulClassName : ''}`}>
          {props?.children?.props?.children}
        </div>
      ) : (
        <Slider
          {...settings}
          className={props?.settings?.classes}
          ref={props?.carRef}
          initialSlide={props?.settings?.initialSlide || 0}
        >
          {props?.children?.props?.children}
        </Slider>
      )}
    </>
  );
};

export default Carousel;
