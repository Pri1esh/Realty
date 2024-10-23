import { Button, CustomImage } from '@components';
import { ITownshipSidebar } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './TownshipSidebar.module.scss';

const TownshipSidebar = (props: ITownshipSidebar) => {
  const { townshipSidebar } = props;
  const { readmore = 'Read More', readless = 'Read Less' } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.TownshipSidebar}>
        <div className={styles.imageSection}>
          <CustomImage
            src={townshipSidebar?.image?.src}
            className="img-fluid"
            alt={townshipSidebar?.image?.alt}
            itemProp="image"
          />
        </div>
        {townshipSidebar?.description}

        <div className="hideMobile">
          <h4 itemProp="name">{townshipSidebar?.studio?.heading}</h4>
          <ul>
            {townshipSidebar?.studio?.services?.map((item: { type: string }, key: number) => {
              return (
                <li itemProp="name" key={`${item?.type + key}`}>
                  {item?.type}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`hideDesktop ${styles.townshipStudio}`}>
          <Button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            variant="link"
            ripple="false"
            className="p-0 border-radius-0 mt-3"
            itemProp="potentialAction"
          >
            {open ? (
              <>
                <span className={'black_link'}>{readless}</span> {getIconFromIconName('ArrowUp')}
              </>
            ) : (
              <>
                <span className={'black_link'}>{readmore}</span> {getIconFromIconName('arrowdown')}
              </>
            )}
          </Button>
          <Collapse in={open}>
            <ul>
              <h4 itemProp="name">{townshipSidebar?.studio?.heading}</h4>
              {townshipSidebar?.studio?.services?.map(
                (
                  item: {
                    type: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                  },
                  key: React.Key | null | undefined,
                ) => {
                  return (
                    <li key={`${item?.type || '' + key}`} itemProp="name">
                      {item?.type}
                    </li>
                  );
                },
              )}
            </ul>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TownshipSidebar;
