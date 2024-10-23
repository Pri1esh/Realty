const getQuicklinksData = (pageType: string, data: any) => {
  const quickLinksData: any = [];
  let pageHeading = '';
  data?.QuickLinks.fields.quickLinks.map(
    (item: {
      [x: string]: {
        heading: string;
        description: React.SetStateAction<string>;
        categories: React.SetStateAction<string>;
      };
    }) => {
      Object.keys(item).forEach((keys) => {
        if (pageType.includes('faq') && keys.toLowerCase().includes('faqs')) {
          quickLinksData.push(item[keys].categories);
          pageHeading = item[keys].heading;
        } else if (keys.toLowerCase().includes(pageType)) {
          quickLinksData.push(item[keys].description);
          pageHeading = item[keys].heading;
        }
      });
    },
  );
  return { quickLinksData: quickLinksData[0], pageHeading };
};

export default getQuicklinksData;
