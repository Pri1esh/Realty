import { ISitemapLinks, ISitemapLinksList } from '@interfaces';
import React from 'react';
import { Col } from 'react-bootstrap';
import Styles from './SitemapLinks.module.scss';

const SitemapLinks = (props: ISitemapLinksList) => {
  const { sitemapDetail } = props;
  return (
    <section className={Styles.sitemap}>
      {sitemapDetail?.map((data: ISitemapLinks, key: number) => (
        <div itemProp="mainEntity" key={`${data.heading + key}`} data-width={data?.md}>
          <h2 itemProp="headline">{data?.heading}</h2>
          {data?.items?.map(
            (
              item: {
                title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                keys: [{ link: string; page: string; target: string }];
                link?: string;
              },
              key: React.Key | null | undefined,
            ) => {
              return (
                <Col sm={12} md={data?.md} key={`${data?.heading + key}`}>
                  {data?.heading?.toLowerCase().includes('township') ? (
                    <a itemProp="url" href={item?.link}>
                      {item?.title}
                    </a>
                  ) : (
                    <h3 itemProp="name">{item?.title}</h3>
                  )}
                  {item?.keys?.map((currKey: { link: string; page: string; target: string }, key) => (
                    <a
                      itemProp="url"
                      target={currKey?.target ? currKey?.target : ''}
                      href={currKey?.link ? `${currKey?.link}` : '#'}
                      key={`${currKey?.link + key}`}
                    >
                      {currKey?.page}
                    </a>
                  ))}
                </Col>
              );
            },
          )}
        </div>
      ))}
    </section>
  );
};
export default SitemapLinks;
