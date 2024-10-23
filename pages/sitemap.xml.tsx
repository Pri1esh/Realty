import { ENDPOINT, getAllAPI } from '@api-manager';
import { filterData } from '@utils';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await getAllAPI([ENDPOINT.sitemapXMLApi]);
    const data = filterData(response);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${data.dynamicSitemap.fields
        .map((item: any) => {
          return `
            <url>
              <loc>${item?.url}</loc>
              <lastmod>${item?.lastmod}</lastmod>    
              <priority>${item?.priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { data: null, error: 'Uh oh! Looks like there is some network issue.' },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {
  //empty function
}
