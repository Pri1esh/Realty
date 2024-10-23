import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  BannerInner,
  Breadcrumbs,
  Button,
  Configuration,
  ContactCta,
  Faq,
  HighlightHeading,
  Highlights,
  Layout,
  Loader,
  ModalFilter,
  ModalPopup,
  NavigationMobile,
  PropertyListing,
  PropertyTabCarousel,
  ResetLocationFilter,
} from '@components';
import { IPropertyCard, ISelectedFilters } from '@interfaces';
import { filterData as filterApiData, getIconFromIconName, useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import styles from './index.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const Location = (props: any) => {
  const router = useRouter();
  const { compData } = props;
  const { data, id } = compData;
  let { type, status } = compData;
  const [show, setShow] = useState(false);
  const { deviceType } = useDeviceType();
  const handleClose = () => setShow(false);
  const [filteredProperties, setfilteredProperties] = useState<any[]>([]);
  const [selectedResidentialMinPrice, setselectedResidentialMinPrice] = useState<number | null>(null);
  const [selectedResidentialMaxPrice, setselectedResidentialMaxPrice] = useState<number | null>(null);
  const [selectedCommercialMinPrice, setselectedCommercialMinPrice] = useState<number | null>(null);
  const [selectedCommercialMaxPrice, setselectedCommercialMaxPrice] = useState<number | null>(null);
  const [totalFiltersSelected, setTotalFiltersSelected] = useState<number>(0);
  const [currTab, setCurrTab] = useState<string>('residential');

  const [commercialSelected, setcommercialSelected] = useState<ISelectedFilters>({
    propertyconfiguration: [],
    propertystatus: [],
  });
  const [residentialSelected, setresidentialSelected] = useState<ISelectedFilters>({
    propertyconfiguration: [],
    propertystatus: [],
  });
  const [previousResidentialFilterState, setpreviousResidentialFilterState] = useState<any>();
  const [previousCommercialFilterState, setpreviousCommercialFilterState] = useState<any>();
  const [tabType, setTabType] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyListingData, setPropertyListingData] = useState<any>();

  useEffect(() => {
    propertyListing && setfilteredProperties(sortProperty(propertyListing?.fields));
    propertyListing && setPropertyListingData(sortProperty(propertyListing?.fields));
    filterData?.fields?.filterTabsData && setCurrTab(filterData?.fields?.filterTabsData[0]?.tabID);

    type && setCurrTab(type);
    type && setTabType(type);
    status && setStatusType(status);

    if (type && status) {
      const projectstatus = [status.replaceAll('_', '').toLowerCase()];
      if (type.toLowerCase().includes('residential')) {
        setresidentialSelected({ ...residentialSelected, propertystatus: projectstatus });
      } else if (type.toLowerCase().includes('commercial')) {
        setcommercialSelected({ ...commercialSelected, propertystatus: projectstatus });
      }
    } else if (status) {
      const projectstatus = [status.replaceAll('_', '').toLowerCase()];
      setresidentialSelected({ ...residentialSelected, propertystatus: projectstatus });
      setcommercialSelected({ ...commercialSelected, propertystatus: projectstatus });
    }

    type && setTotalFiltersSelected(1);
    status && setTotalFiltersSelected((prev: number) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortProperty = (propertyArray: { propertyTypeFilter: number }[]) => {
    const arr = propertyArray;
    arr.sort((a: { propertyTypeFilter: number }, b: { propertyTypeFilter: number }) => {
      return a?.propertyTypeFilter > b?.propertyTypeFilter ? 1 : -1;
    });
    return arr;
  };

  const clearFilterData = () => {
    setfilteredProperties(propertyListing?.fields);
    setresidentialSelected({ propertyconfiguration: [], propertystatus: [] });
    setcommercialSelected({ propertyconfiguration: [], propertystatus: [] });
  };

  const resetApiFilter = async () => {
    const res = await getAllAPI([ENDPOINT.locationLayoutClient + '&location=' + id]);
    const propertyData = filterApiData(res);
    setPropertyListingData(propertyData?.fields);
    setfilteredProperties(propertyData?.fields);
  };

  const resetFilterData = async () => {
    setLoading(true);
    if (propertyListing?.fields?.length === 0 && (type || status)) {
      if (typeof window === 'undefined') {
        return;
      }
      await resetApiFilter();
      window.location.href = `${process.env.NEXT_PUBLIC_STAGING_LINK}/${id}`;
      type = null;
      status = null;
      setTabType(type);
      setCurrTab(filterData?.fields?.filterTabsData[0]?.tabID);
      setTotalFiltersSelected(0);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_STAGING_LINK}/${data.locationInfo.fields.locationHeading}-${data.locationInfo.fields.city}`;
      setfilteredProperties(propertyListingData);
      setTotalFiltersSelected(0);
      type && setTotalFiltersSelected(1);
      status && setTotalFiltersSelected((prev) => prev + 1);
    }
    setresidentialSelected({ propertyconfiguration: [], propertystatus: [] });
    setcommercialSelected({ propertyconfiguration: [], propertystatus: [] });
    setpreviousCommercialFilterState(null);
    setpreviousResidentialFilterState(null);
    setselectedCommercialMaxPrice(null);
    setselectedCommercialMinPrice(null);
    setselectedResidentialMaxPrice(null);
    setselectedResidentialMinPrice(null);
    setLoading(false);
    window.location.href = `property-in-${window.location.href.split('/').pop()?.split('-').slice(-2)[0]}?type=residential`;
  };

  const resetPropertyStatus = () => {
    if (!status) return;
    setLoading(true);
    type
      ? router.push(
          {
            pathname: `${process.env.NEXT_PUBLIC_STAGING_LINK}/${id}`,
            query: { type: type },
          },
          undefined,
          { shallow: false },
        )
      : router.push(
          {
            pathname: `${process.env.NEXT_PUBLIC_STAGING_LINK}/${id}`,
          },
          undefined,
          { shallow: false },
        );

    let url = ENDPOINT.locationLayoutClient + '&location=' + id;
    if (type) {
      url = url + '&type=' + type;
    }
    getAllAPI([url])
      .then((res) => {
        const propertyData = filterApiData(res)?.propertyListing;
        setPropertyListingData(propertyData?.fields);
        setfilteredProperties(propertyData?.fields);
        setStatusType(null);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const {
    locationbanner,
    citydescription,
    breadCrumbList,
    Faq: faq,
    GetInTouch,
    AboutAdaniHome,
    Achievements: achievements,
    residentialPropertyall,
    commercialPropertyall,
    locationInfo,
    footer,
    header,
    filterData,
    noResultFound,
    mMenu,
    propertyListing,
    searchData,
    seoData = {},
    Configurations,
    HeadingDescription,
    OtherProjects,
  } = data;

  const isSeoPage = HeadingDescription?.fields?.isSEOPage || false;

  const handleShow = () => {
    setShow(!show);
  };

  const setPropertyListing = () => {
    if (loading) {
      return <Loader />;
    } else if (propertyListing?.fields && filteredProperties?.length) {
      return filteredProperties.map((property: IPropertyCard, key: number) => {
        return (
          <div
            itemProp="mainEntityOfPage"
            className={styles.listingRow}
            key={`${property?.data?.propertyID + key}`}
            id="projects"
          >
            <PropertyListing property={property} currID={property?.data.propertyID} />
          </div>
        );
      });
    } else if (propertyListing?.fields && totalFiltersSelected <= 0 && propertyListing?.fields?.length) {
      return propertyListing?.fields?.map((property: IPropertyCard, key: number) => (
        <div
          itemProp="mainEntityOfPage"
          className={styles.listingRow}
          key={`${property?.data?.propertyID + key}`}
          id="projects"
        >
          <PropertyListing property={property} currID={property?.data.propertyID} />
        </div>
      ));
    } else {
      return (
        <ResetLocationFilter
          heading={noResultFound?.fields?.heading}
          description={noResultFound?.fields?.description}
          buttonText={noResultFound?.fields?.buttonText}
          resetFilter={resetFilterData}
        />
      );
    }
  };

  return (
    <div itemScope itemType="https://schema.org/RealEstateListing" className={styles.locationpage}>
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <div className="hideDesktop">
              <NavigationMobile BackIconwithText={true} />
            </div>
            {citydescription?.fields && locationInfo?.fields && (
              <Highlights
                CitySearchData={citydescription?.fields?.data}
                currCity={locationInfo?.fields?.city}
                locationHeading={locationInfo?.fields?.locationHeading}
              />
            )}
            {HeadingDescription?.fields && <HighlightHeading compData={HeadingDescription?.fields} />}
            {locationbanner?.fields && (
              <div className={styles.locationHeader}>
                <BannerInner bannerInnerData={locationbanner?.fields[0]} />
              </div>
            )}
            <Row className={styles.porpertyListingWrapper}>
              <Col lg={8}>
                <div className={styles.propertySearch}>
                  {locationInfo?.fields && (
                    <h2 itemProp="headline">
                      {filteredProperties?.length}{' '}
                      {filteredProperties?.length === 1
                        ? locationInfo?.fields?.projectfound
                        : locationInfo?.fields?.projectsfound}{' '}
                      {locationInfo?.fields?.city}
                    </h2>
                  )}
                  {filterData?.fields && !isSeoPage && (
                    <Button variant="outline-secondary" onClick={handleShow} className="ripple_root">
                      <>
                        {getIconFromIconName('Filter')}
                        {filterData?.fields?.heading}
                        {totalFiltersSelected > 0 && (
                          <i className={styles.totalFiltersSelected}>{totalFiltersSelected}</i>
                        )}
                      </>
                    </Button>
                  )}
                  {filterData?.fields && deviceType === 'desktop' ? (
                    <ModalPopup
                      show={show}
                      onHide={() => setShow(!show)}
                      modalTitle={filterData?.fields?.heading}
                      className="modalFilter"
                      modalSize="md"
                      modalBody={
                        <ModalFilter
                          locationFilterData={filterData?.fields?.filterTabsData}
                          allProperties={propertyListingData}
                          setshow={setShow}
                          setfilteredProperties={setfilteredProperties}
                          clearFilterData={clearFilterData}
                          selectedResidentialMinPrice={selectedResidentialMinPrice}
                          setselectedResidentialMinPrice={setselectedResidentialMinPrice}
                          selectedResidentialMaxPrice={selectedResidentialMaxPrice}
                          setselectedResidentialMaxPrice={setselectedResidentialMaxPrice}
                          selectedCommercialMinPrice={selectedCommercialMinPrice}
                          setselectedCommercialMinPrice={setselectedCommercialMinPrice}
                          selectedCommercialMaxPrice={selectedCommercialMaxPrice}
                          setselectedCommercialMaxPrice={setselectedCommercialMaxPrice}
                          currTab={currTab}
                          setCurrTab={setCurrTab}
                          commercialSelected={commercialSelected}
                          setcommercialSelected={setcommercialSelected}
                          residentialSelected={residentialSelected}
                          setresidentialSelected={setresidentialSelected}
                          previousResidentialFilterState={previousResidentialFilterState}
                          setpreviousResidentialFilterState={setpreviousResidentialFilterState}
                          previousCommercialFilterState={previousCommercialFilterState}
                          setpreviousCommercialFilterState={setpreviousCommercialFilterState}
                          setTotalFiltersSelected={setTotalFiltersSelected}
                          clearAllLabel={filterData?.fields?.clearAllLabel}
                          applyFilterLabel={filterData?.fields?.applyFilterLabel}
                          filteredTabtype={tabType}
                          status={statusType}
                          resetPropertyStatus={resetPropertyStatus}
                        />
                      }
                    />
                  ) : (
                    filterData?.fields && (
                      <Offcanvas className={styles.filterCanvas} placement="bottom" show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>{filterData?.fields?.heading}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <ModalFilter
                            locationFilterData={filterData?.fields?.filterTabsData}
                            allProperties={propertyListingData}
                            setshow={setShow}
                            setfilteredProperties={setfilteredProperties}
                            clearFilterData={clearFilterData}
                            selectedResidentialMinPrice={selectedResidentialMinPrice}
                            setselectedResidentialMinPrice={setselectedResidentialMinPrice}
                            selectedResidentialMaxPrice={selectedResidentialMaxPrice}
                            setselectedResidentialMaxPrice={setselectedResidentialMaxPrice}
                            selectedCommercialMinPrice={selectedCommercialMinPrice}
                            setselectedCommercialMinPrice={setselectedCommercialMinPrice}
                            selectedCommercialMaxPrice={selectedCommercialMaxPrice}
                            setselectedCommercialMaxPrice={setselectedCommercialMaxPrice}
                            currTab={currTab}
                            setCurrTab={setCurrTab}
                            commercialSelected={commercialSelected}
                            setcommercialSelected={setcommercialSelected}
                            residentialSelected={residentialSelected}
                            setresidentialSelected={setresidentialSelected}
                            previousResidentialFilterState={previousResidentialFilterState}
                            setpreviousResidentialFilterState={setpreviousResidentialFilterState}
                            previousCommercialFilterState={previousCommercialFilterState}
                            setpreviousCommercialFilterState={setpreviousCommercialFilterState}
                            setTotalFiltersSelected={setTotalFiltersSelected}
                            clearAllLabel={filterData?.fields?.clearAllLabel}
                            applyFilterLabel={filterData?.fields?.applyFilterLabel}
                            filteredTabtype={tabType}
                            status={statusType}
                            resetPropertyStatus={resetPropertyStatus}
                          />
                        </Offcanvas.Body>
                      </Offcanvas>
                    )
                  )}
                </div>
                {setPropertyListing()}
              </Col>
              <Col lg={4} className={styles.enquireFormorder}>
                <EnquiryFormHelper doubleColumn={false} singleColumn={true} />
              </Col>
              {residentialPropertyall?.fields && (
                <Col lg={12}>
                  <div className="section-row tabs-projects">
                    <PropertyTabCarousel propertyAll={residentialPropertyall} propertyType={'residential'} />
                  </div>
                </Col>
              )}
              {OtherProjects?.fields && (
                <Col lg={12}>
                  <div className="section-row tabs-projects">
                    <PropertyTabCarousel propertyAll={OtherProjects} propertyType={'other'} isSeoPage={isSeoPage} />
                  </div>
                </Col>
              )}
              {commercialPropertyall?.fields && (
                <Col lg={12}>
                  <div className="section-row tabs-projects">
                    <PropertyTabCarousel propertyAll={commercialPropertyall} propertyType={'commercial'} />
                  </div>
                </Col>
              )}
            </Row>
            {faq?.fields && (
              <div className="section-row section_faq">
                <Faq
                  faqs={faq?.fields?.faqItems}
                  heading={faq?.params?.ComponentTitle}
                  seeall={faq?.params?.SeeAllKeyword}
                  seeallLink={faq?.fields?.faqLink}
                />
              </div>
            )}
          </Container>
          {GetInTouch?.fields && (
            <div className="section-row">
              <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
            </div>
          )}
          <Container>
            <Row>
              <Col>
                {AboutAdaniHome?.fields?.length > 0 && (
                  <div className="section-row">
                    <AboutAdani
                      aboutData={AboutAdaniHome?.fields[0]}
                      readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                      readless={AboutAdaniHome?.params?.ReadLessKeyword}
                    />
                  </div>
                )}
                {Configurations?.fields?.length > 0 && <Configuration compData={Configurations?.fields} />}
                {achievements?.fields && (
                  <div className="section-row footerSection achievements">
                    <Achievements data={achievements?.fields?.data} />
                  </div>
                )}
              </Col>
            </Row>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export default Location;
