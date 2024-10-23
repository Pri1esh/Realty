import { BackHeader, BackToTop, Footer, Header, StickyMobileMenu } from '@components';
import { ILayout } from '@interfaces';
import { deleteSessionStorage, filterHeaderData, isTouchScreendevice, useDeviceType } from '@utils';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useGTM from 'src/utils/useGTM';
import styles from './layout.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const { publicRuntimeConfig } = getConfig();

const Layout = (props: ILayout) => {
  const {
    children,
    headerAbsolute = false,
    footerData,
    headerData,
    showHeader = true,
    showFooter = true,
    showBackHeader = true,
    seoData,
    propertyType = '',
    projectNameData = '',
    PropertyBasicInfo = null,
    searchData,
    reference,
    searchActive,
    isBordered,
    showStickyMenu = false,
    openSearch = false,
    setOpenSearch,
    stickyBarData,
    blogSchema = null,
    isHomePage = false,
    isProjectCompleted = false,
    ratingSchema = null,
  } = props;

  const [show, setShow] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string>('');
  const { deviceType } = useDeviceType();
  const { sendEvent } = useGTM();

  useEffect(() => {
    const path: string | boolean =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');

    deleteSessionStorage('enquiryInPage');
  }, []);

  const metaDescription = seoData?.metaDescription || 'Adani Realty Services - Experience the Realty';
  const metaKeywords = seoData?.metaKeywords || 'Adani Realty Services';
  const browserTitle = seoData?.browserTitle || 'Adani Realty Services';
  const ogDescription = seoData?.ogDescription ?? '';
  const ogTitle = seoData?.ogTitle ?? '';
  const ogImage = seoData?.ogImage ?? '';
  const robotsTags = seoData?.robotsTags ?? '';
  const ogKeywords = seoData?.ogKeyword ?? '';
  const canonicalUrl = seoData?.canonicalUrl ?? '';
  const googleSiteVerification = seoData?.googleSiteVerification ?? '';
  const msValidate = seoData?.msValidate ?? '';
  const [resizing, setResizing] = useState<boolean>(false);

  const debounce_fun = () => {
    if (!resizing) {
      setResizing(true);
      setTimeout(() => {
        setResizing(false);
        isTouchScreendevice() && window.innerWidth > window.innerHeight && window.scrollBy({ top: 1 });
      }, 500);
    }
  };

  useEffect(() => {
    global.window && global.window.addEventListener('resize', debounce_fun);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buPrimaryNavCallback = () => {
    setShow(true);
    const eventVal = {
      event: 'enquire_now',
      category: 'realty_hp',
      sub_category: 'top_navigation',
      page_type: pageUrl,
      click_text: 'Enquire Now',
    };
    sendEvent(eventVal);
  };

  const headerJsonData = filterHeaderData(headerData) || undefined;
  const headerArgs = {
    navData: headerJsonData?.primaryHeaderMenus?.fields?.data.length
      ? headerJsonData?.primaryHeaderMenus?.fields?.data
      : [{ items: [] }],
    menuData:
      headerJsonData?.hamburgerMenu?.fields?.hamburgerMenu.length > 0
        ? headerJsonData?.hamburgerMenu?.fields?.hamburgerMenu
        : [],
    airportList: headerJsonData?.airportList?.fields?.airportList.length
      ? headerJsonData?.airportList?.fields?.airportList
      : [{ items: [] }],
    topbarList:
      headerJsonData?.topNavigation?.fields?.topNavigation.length > 0
        ? headerJsonData?.topNavigation?.fields?.topNavigation
        : [],
    headerLogo: headerJsonData?.airportList?.fields?.airportList[0]?.headerImage,
    buLogo: headerJsonData?.airportList?.fields?.airportList[0]?.headerImage,
    buLink: headerJsonData?.airportList?.fields?.airportList[0]?.headerLogoLink,
    buBackBtnText: headerJsonData?.airportList?.fields?.airportList[0]?.headerBackText,
    buBackBtnLink: headerJsonData?.airportList?.fields?.airportList[0]?.headerBackLink,
    buLogoAltText: headerJsonData?.airportList?.fields?.airportList[0]?.headerLogoAltText,
    buPrimaryNavCallback,
  };

  const footerContent = footerData && footerData[0]?.fields;
  const footerArgs = {
    mainNavigations: footerContent?.mainNavigations?.length > 0 ? footerContent?.mainNavigations : [],
    paymentSection: false,
    buCopyright: footerContent?.copyRight?.length > 0 ? footerContent?.copyRight[0]?.subHeading : [],
    socialLinks: footerContent?.socialLinks?.length > 0 ? footerContent?.socialLinks : [{ items: [] }],
    isRealty: true,
  };

  return (
    <>
      <Head>
        <title>{browserTitle}</title>
        <meta name="keywords" content={metaKeywords} />
        <meta name="description" content={metaDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
          key="meta_viewport"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${publicRuntimeConfig.baseImagePath}assets/icons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${publicRuntimeConfig.baseImagePath}assets/icons/favicon-16x16.png`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={robotsTags} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:keywords" content={ogKeywords} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="google-site-verification" content={googleSiteVerification} />
        <meta name="msvalidate_01" content={msValidate} />
        {isHomePage && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
              const hasDisclaimerCookie = document.cookie.split(';').filter(function (key) {return key.indexOf('disclaimer') != -1});
              const html = document.getElementsByTagName('html')[0];
              if(hasDisclaimerCookie.length <= 0 ){
                html.classList.add('disclaimerOpen')
              }
              })()`,
            }}
          />
        )}
        <script
          id="schemaData"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Organization',
              name: 'Adani Realty',
              url: seoData?.orgSchema?.url ?? (typeof window !== 'undefined' ? window.location.origin : ''),
              logo: seoData?.orgSchema?.logo,
              address: {
                '@type': 'PostalAddress',
                streetAddress: seoData?.orgSchema?.streetAddress ?? '',
                addressLocality: seoData?.orgSchema?.addressLocality ?? '',
                addressRegion: seoData?.orgSchema?.addressRegion ?? '',
                postalCode: seoData?.orgSchema?.postalCode ?? '',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: seoData?.orgSchema?.telephone ?? '',
                contactType: seoData?.orgSchema?.contactType ?? '',
                contactOption: seoData?.orgSchema?.contactOption ?? '',
                areaServed: seoData?.orgSchema?.areaServed ?? '',
              },
              sameAs: seoData?.orgSchema?.sameAs ?? [''],
            }),
          }}
        />
        {PropertyBasicInfo && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Product',
                name: PropertyBasicInfo?.fields?.ratingName,
                image: PropertyBasicInfo?.fields?.propertyImage,
                description: PropertyBasicInfo?.fields?.propertyDescription,
                brand: {
                  '@type': 'Brand',
                  name: 'Adani Realty',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: PropertyBasicInfo?.fields?.rating,
                  bestRating: PropertyBasicInfo?.fields?.bestRating,
                  reviewCount: PropertyBasicInfo?.fields?.ratingCount,
                },
              }),
            }}
          />
        )}
        {ratingSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `${ratingSchema}`,
            }}
          />
        )}
        {blogSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `${blogSchema}`,
            }}
          />
        )}
      </Head>
      {deviceType === 'desktop' || !showBackHeader ? (
        <>
          {showHeader && (
            <Header
              {...headerArgs}
              isAbsolute={headerAbsolute}
              addOnClass={'hideTopNav'}
              searchData={searchData}
              reference={reference}
              searchActive={searchActive}
              isBordered={isBordered}
            />
          )}
        </>
      ) : (
        <>
          {showBackHeader ? (
            <div className={styles.backArrow}>
              <div className="container">
                <BackHeader
                  handleClick={() =>
                    typeof window !== 'undefined' && document.referrer.toLowerCase().includes(window.location.origin)
                      ? window.history.back()
                      : window.location.replace(window.location.origin)
                  }
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {children}
      {showStickyMenu && (
        <StickyMobileMenu
          defaultActive={`${openSearch ? 'Search' : 'Home'}`}
          hamburgerData={headerArgs?.menuData}
          buLogo={headerArgs?.buLogo}
          buLink={headerArgs?.buLink}
          buLogoAltText={headerArgs?.buLogoAltText}
          pageName={pageUrl}
          setOpenSearch={setOpenSearch}
          searchData={searchData}
          connectData={headerArgs?.navData}
          data={stickyBarData}
          propertyType={propertyType}
        />
      )}
      {showFooter && (
        <Footer
          {...footerArgs}
          copyRight={footerContent?.copyRight?.length > 0 ? footerContent?.copyRight : [{ items: [] }]}
        />
      )}
      {show && (
        <>
          <EnquiryFormHelper
            isPopup={true}
            setShow={setShow}
            showForm={show}
            propertyType={propertyType}
            projectNameData={projectNameData}
            isProjectCompleted={isProjectCompleted}
          />
        </>
      )}

      {deviceType === 'desktop' && <BackToTop />}
    </>
  );
};

Layout.propTypes = {};

export default Layout;
