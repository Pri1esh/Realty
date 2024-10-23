import { Carousel, RestaurantCard } from '@components';
import { IArticleCarousel, IRestaurantCard } from '@interfaces';
import React from 'react';

const ArticlesCarousel = (props: IArticleCarousel) => {
  const { data } = props;

  return (
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
        slidesToShow: 3,
        speed: 500,
        swipe: true,
        responsive: [
          {
            breakpoint: 1199,
            settings: { slidesToShow: 2.5, infinite: false, autoplay: false, arrows: false },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2.5, infinite: false, autoplay: false, arrows: false },
          },
          {
            breakpoint: 500,
            settings: { slidesToShow: 1.2, infinite: false, autoplay: false, arrows: false },
          },
        ],
      }}
    >
      <React.Fragment key=".0">
        {data?.map((item: IRestaurantCard, index: number) => (
          <RestaurantCard
            key={`${(item?.src ?? '') + index}`}
            src={item?.src}
            title={item?.title}
            date={item?.datetime}
            thumbLogo={false}
            enquireBtn={false}
            slug={item?.slug}
            articlesCard={true}
            address={item?.address || ''}
            imgtitle={item?.imgtitle}
          />
        ))}
      </React.Fragment>
    </Carousel>
  );
};

export default ArticlesCarousel;
