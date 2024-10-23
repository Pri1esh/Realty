import { Carousel, EventTabs, VerticalTabs } from '@components';
import { IEvents, IEventTabGalleryData } from '@interfaces';
import React from 'react';
import styles from './events.module.scss';

const Events = (props: IEvents) => {
  const { data } = props;
  const configureEventsArray = (eventsArray: { data: any }) => {
    const outputArray: { status: string; event: any[] }[] = [];

    eventsArray?.data?.map((event: { status: string }) => {
      const eventstatus = outputArray.find((currEvent: { status: string }) => {
        return currEvent['status'] && currEvent['status'] === event['status'];
      });
      if (eventstatus === undefined) {
        const events = [];
        events.push(event);
        outputArray.push({
          status: event['status'],
          event: events,
        });
      } else {
        eventstatus['event'].push(event);
      }
    });
    return outputArray;
  };

  const getEventDataIntoArray = (eventArray: any[]) => {
    const arr: any[] = [];
    eventArray?.map((eventData: { event: any[]; status: string }) =>
      arr.push({
        content: (
          <div>
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
                    settings: { slidesToShow: 3, slidesToScroll: 1 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 2, arrows: false },
                  },
                  {
                    breakpoint: 500,
                    settings: { slidesToShow: 1.5, infinite: false, autoplay: false, arrows: false },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {eventData.event.map(
                  (
                    item: { src: string; imgalt: string; title: string; gallery: [IEventTabGalleryData] },
                    index: number,
                  ) => (
                    <EventTabs
                      src={item.src}
                      imgalt={item.imgalt}
                      title={item.title}
                      key={`${item.src + index}`}
                      galleryData={item.gallery}
                    />
                  ),
                )}
              </React.Fragment>
            </Carousel>
          </div>
        ),
        key: `${eventData?.status}`,
        title: `${eventData?.status}`,
      }),
    );
    return arr;
  };
  return (
    <div className={styles.tabsEvents}>
      <VerticalTabs
        horizontalTabView={true}
        className="scrollbar-x"
        isClick={true}
        tabData={getEventDataIntoArray(configureEventsArray(data))}
        transition
        defaultActiveKey={data[0]?.status || '2022'}
      />
    </div>
  );
};

export default Events;
