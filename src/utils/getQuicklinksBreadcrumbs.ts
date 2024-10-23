const getQuicklinksBreadcumbs = (pageType: string, data: any) => {
  let breadCrumbLabel = '';
  let breadCrumbList = '';
  data?.QuickLinks?.fields?.pageSpecificBreadcrumbs?.map((item: { heading: string; link: string }) => {
    if (item?.heading.toLowerCase().includes(pageType)) {
      breadCrumbLabel = item?.heading;
      breadCrumbList = item?.link;
    }
  });
  const breadcrumbs: { label: string; href: string }[] = [];
  data?.breadCrumbList?.fields?.map((item: { label: string; href: string }) => {
    const currBreadcrumb = item;
    if (item?.label.toLowerCase().includes('quick')) {
      currBreadcrumb.label = breadCrumbLabel;
      currBreadcrumb.href = breadCrumbList;
    }
    breadcrumbs.push(currBreadcrumb);
  });
  return breadcrumbs;
};

export default getQuicklinksBreadcumbs;
