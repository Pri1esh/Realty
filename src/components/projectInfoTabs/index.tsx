import { IProjectInfoTabs } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import styles from './projectInfoTabs.module.scss';

const ProjectInfoTabs = (props: IProjectInfoTabs) => {
  const { TabsData, defaultActiveTab = '' } = props;
  const activeTabRef = useRef<HTMLLIElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    TabsData?.length && TabsData[0]?.title && setActiveTab(TabsData[0]?.title);
    let timer: any = null;
    window.addEventListener(
      'scroll',
      function () {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          handleScroll();
        }, 50);
      },
      false,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        function () {
          if (timer !== null) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            handleScroll();
          }, 50);
        },
        false,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => defaultActiveTab && handleSmoothScroll(`#${defaultActiveTab}`), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveTab]);

  const handleClick = () => {
    const parent = parentContainerRef?.current;
    const tab = activeTabRef?.current;
    const parentWidth = parent?.clientWidth ?? 0;
    const tabOffsetLeft = tab?.offsetLeft ?? 0;
    const tabWidth = tab?.clientWidth ?? 0;
    const firstTabId = TabsData[0]?.link;
    const firstTab = document?.querySelector(firstTabId);
    const firstWidth = firstTab?.offsetLeft || 0;
    const leftWidth = tab?.getBoundingClientRect().left ?? 0;

    if (tabOffsetLeft > parentWidth - tabWidth) {
      parent?.scrollBy({ left: leftWidth - firstWidth, behavior: 'smooth' });
    } else {
      parent?.scrollBy({ left: tabOffsetLeft - parentWidth - tabWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    for (let index = TabsData?.length - 1; index >= 0; index--) {
      if (
        parentContainerRef?.current &&
        window.scrollY >=
          document.querySelector(TabsData[index].link)?.offsetTop -
            (deviceType === 'desktop' ? 180 : parentContainerRef?.current?.clientHeight + 15)
      ) {
        setActiveTab(TabsData[index]?.title);
        handleClick();
        break;
      }
    }
    if (
      parentContainerRef?.current &&
      TabsData &&
      window.scrollY <=
        document.querySelector(TabsData[0].link)?.offsetTop -
          (deviceType === 'desktop' ? 180 : parentContainerRef?.current?.clientHeight + 15)
    ) {
      setActiveTab(TabsData[0]?.title);
      handleClick();
    }
  };

  const scrollToSmoothly = (pos: number, time: number, item: any) => {
    const currentPos = window.scrollY;
    let start: number | null = null;
    if (time == null) time = 500;
    (pos = +pos), (time = +time);
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      const progress = currentTime - start;
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, pos);
      }
    });

    setTimeout(() => {
      if (
        item &&
        parentContainerRef?.current &&
        Math.abs(
          item?.getBoundingClientRect().top -
            (deviceType === 'desktop' ? 170 : parentContainerRef?.current?.clientHeight + 15),
        ) > 10
      ) {
        window.scrollBy({
          top:
            item?.getBoundingClientRect().top -
            (deviceType === 'desktop' ? 170 : parentContainerRef?.current?.clientHeight + 15),
        });
      }
    }, 350);
  };

  const handleSmoothScroll = (link: string) => {
    parentContainerRef?.current &&
      scrollToSmoothly(
        (document.querySelector(link) as any)?.offsetTop -
          (deviceType === 'desktop' ? 170 : parentContainerRef?.current?.clientHeight + 15),
        300,
        document.querySelector(link),
      );
  };

  return (
    <div className={styles.btngroup} ref={parentContainerRef}>
      <ul>
        {TabsData?.map((data: { title: string; linktitle: string; link: any }, key: number) => (
          <li
            itemProp="relatedLink"
            key={`${data?.title + key}`}
            className={`${activeTab === data?.title ? 'tabActive' : 'inactive'}`}
            ref={activeTab === data?.title ? activeTabRef : null}
          >
            <a
              itemProp="sameAs"
              title={data?.linktitle}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(data?.link);
              }}
            >
              {data.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProjectInfoTabs;
