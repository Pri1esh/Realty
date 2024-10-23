const filterComponent = (data: any, componentName: string) => {
  const filteredData = data?.filter((i: any) => i.componentName === componentName);
  return filteredData[0];
};

const filterData = (res: any) => {
  const val: any = {};
  val['header'] = res[0]?.sitecore?.route?.placeholders?.header;
  val['footer'] = res[0]?.sitecore?.route?.placeholders?.footer;
  res?.map((currData: any) => {
    currData?.sitecore?.route?.placeholders?.main?.map((currComponent: any) => {
      val[currComponent['componentName']] = currComponent;
    });
  });
  return val;
};

const filterHeaderData = (data: any) => {
  const val: any = {};
  data?.map((currData: any) => {
    val[currData['componentName']] = currData;
  });
  return val;
};

export { filterComponent, filterData, filterHeaderData };
