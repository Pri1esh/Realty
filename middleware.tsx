// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

const Middleware = (req: any) => {
  const obj = [
    {
      source: '/the-good-life',
      destination: '/address-of-goodness',
    },
    {
      source: '/blogs/category/all',
      destination: '/blogs',
    },
  ];

  const filterData = obj.filter((node) => {
    return node.source == req.nextUrl.pathname ? 1 : 0;
  });

  if (filterData[0] && filterData[0].source == req.nextUrl.pathname) {
    return NextResponse.redirect(new URL(filterData[0].destination, req.url), 301);
  }
  if (
    req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase() ||
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/assets')
  )
    return NextResponse.next();

  return NextResponse.redirect(
    req.nextUrl.origin + process.env.NEXT_PUBLIC_STAGING_LINK + req.nextUrl.pathname.toLowerCase(),
  );
};

export default Middleware;
