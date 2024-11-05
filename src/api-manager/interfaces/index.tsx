import {
  AreaLabel,
  Condition,
  Continent,
  Onwards,
  PriceLabel,
  PropertyStatus,
  PropertyStatusFilter,
  PropertyStatusID,
  PropertyTypeFilter,
  RegionName,
  Rera,
} from '@enum';
import React, { ReactNode } from 'react';
import { Control, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';

export interface ICommunicationCornerDefaultArticles {
  items?: [ICommunicationCornerItem];
}

export interface ICommunicationCornerItem {
  link?: string;
  src?: string;
  title: string;
  subHeading: string;
  dateTime?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null;
  categoryTitle?: string;
  categoryLink: string;
  isDefault?: boolean;
  imgTitle?: string;
}

export interface ISelectedFilters {
  propertyconfiguration: string[];
  propertystatus: string[];
}

export interface IPropertyCard {
  carouselImages: [
    {
      items: [
        { alt: string; src: string; imageDesc: string; porjectLogo: string; porjectLogoAlt: string; target: string },
      ];
    },
  ];
  data: {
    rera: string;
    propertyStatusFilter: string;
    propertyStatus: string;
    projectName: string;
    projectSpec: string;
    areaDetail: string;
    priceDetail: number;
    condition: string;
    onwards: string;
    link: string;
    target: string;
    propertyID: number;
    linktarget: string;
    areaLabel: string;
    priceLabel: string;
  };
}

export interface IPropertyListingSummary {
  property: IPropertyCard;
  reraBadge?: boolean;
  propertyID?: number;
  newLaunch?: boolean;
  currID?: number;
  setCurrID?: any;
}

export interface IPropertyListingCard {
  link: string;
  alt: string;
  src: string;
  imageDesc: string;
  target: string;
}

export interface IClubLandingModule {
  clubLogo: string;
  clubName: string;
  clubAddress: string;
  clubAbout: string;
  readmore: string;
  readless: string;
  artisticDisclaimer: string;
  data: [{ clubImage: string; clubAlt: string; type: string }];
}

export interface IRestaurantCard {
  restaurantData?: boolean;
  thumbLogo?: boolean;
  officeAddress?: boolean;
  articlesCard?: boolean;
  enquireBtn?: boolean;
  slug?: string;
  src?: string;
  title?: string;
  logo?: string;
  discount?: string;
  price?: string;
  date?: string;
  address: string;
  status?: string;
  datetime?: string;
  imgtitle?: string;
}

export interface IAboutDataItem {
  heading: string;
  about: string;
  description?: string;
  current?: string;
  terms?: string;
  detailLink?: string;
  links?: string;
  content?: string;
  readMore: string;
  extrCharges?: string;
  features?: [];
  cityName?: string;
}

export interface IAboutAdani {
  aboutData: IAboutDataItem;
  readmore?: string;
  readless?: string;
  description?: string;
}

export interface INewsCoverageItem {
  posterSrc: string;
  posterAlt: string;
  title: string;
  date: string;
  link: string;
  linkTitle: string;
  modalTitle: string;
}

export interface INewsCoverage {
  galleryData: any;
  id: number;
  data: {
    posterSrc: string;
    posterAlt: string;
    title: string;
    date: string;
    link: string;
    linkTitle: string;
    modalTitle: string;
    pdfSrc?: string;
  };
}

export interface IGalleryDataItem {
  posterSrc: string;
  imgType?: string;
  posterAlt: string;
  modalTitle: string;
}

export interface IEventTabs {
  src?: string;
  imgalt?: string;
  imgtitle?: string;
  imgtype?: string;
  title?: string;
  galleryData?: [IEventTabGalleryData];
}

export interface IEventTabGalleryData {
  src?: string;
  imgalt?: string;
  imgType?: string;
}

export interface IWhyAdaniDescription {
  heading: string;
}

export interface IWhyAdaniHighlights {
  aligncol?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  imageAlt?: string;
  imageTitle?: string;
  src?: string;
  dataAlign?: string;
  title?: string;
  subHeading?: string;
  imgType?: string;
}
export interface ITownshipAmenities {
  dataList: {
    sectionHeading?: string;
    subHeading?: string;
    description?: string;
    imageSource: string;
    imageSourceMobile: string;
    imageSourceTablet: string;
    imageAlt?: string;
  }[];
  mainHeading?: string;
  id: string;
}

export interface IAboutUsBanner {
  aboutUsBanner: {
    leftImg: string;
    imgAlt: string;
    imgTitle: string;
    rightImg: string;
    heading: string;
    subHeading: string;
    description: string;
  };
}

export interface ICountUp {
  start: string;
  endCount: string;
  delay: string;
  count?: string;
}

export interface IAboutUsHighlights {
  highlightsData: {
    data: [{ start: string; count: string; delay: string; detail: string }];
    bannerImage: string;
    imgType: string;
  };
}

export interface IAboutUsTimelineCarouselData {
  src: string;
  name: string;
  year: string;
  highlight: string;
  imgType: string;
  mobileImage: string;
}

export interface IAboutUsTimelineCarousel {
  data: [IAboutUsTimelineCarouselData];
}

export interface IAccoladesList {
  accoladesData: [IAccoladesListItem];
}

export interface IAccoladesListItem {
  src: string;
  imgalt: string;
  caption: string;
  winner: string;
  date: string;
}

export interface IAchievements {
  data: IAchievementItem[];
}

export interface IAchievementItem {
  icon: string;
  start: string;
  count: string;
  delay: string;
  desc: string;
}
export interface IArrowScrollDown {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

export interface IArticleCarousel {
  data: [IRestaurantCard];
}

export interface ISeoData {
  browserTitle: string;
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogDescription: string;
  ogImage: string;
  ogTitle: string;
  robotsTags: string;
  ogUrl: string;
  ogKeyword: any;
  canonicalUrl: string;
  googleSiteVerification: string;
  msValidate: string;
  orgSchema: IOrgSchema;
}

export interface IOrgSchema {
  telephone?: string;
  contactType?: string;
  areaServed?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  sameAs: string[];
  contactOption?: string;
  logo?: string;
  url?: string;
}

export interface ILayout {
  children?: ReactNode;
  showAction?: boolean;
  headerAbsolute?: boolean;
  layoutData?: any;
  seoData?: ISeoData;
  footerData?: any;
  headerData?: any;
  copyright?: any;
  showHeader?: boolean;
  showFooter?: boolean;
  showBackHeader?: boolean;
  backHeaderTitle?: string;
  handleBackHeaderClick?: () => void;
  showHomeHeader?: boolean;
  propertyType?: any;
  projectNameData?: any;
  PropertyBasicInfo?: any;
  searchData?: any;
  mobActive?: any;
  reference?: any;
  searchActive?: any;
  isBordered?: any;
  showStickyMenu?: boolean;
  openSearch?: boolean;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  stickyBarData?: any;
  blogSchema?: any;
  isHomePage?: boolean;
  isProjectCompleted?: boolean;
  ratingSchema?: any;
}

export interface IBannerInner {
  bannerInnerData: IBannerInnerData;
  showDownload?: boolean;
  showThumb?: boolean;
  showTitle?: boolean;
  showPin?: boolean;
}

export interface IBannerInnerData {
  src: string;
  class1: string;
  class2: string;
  alt: string;
  srcMobile?: string;
  thumbImg: string;
  imgalt: string;
  heading: string;
  subheading: string;
  title: string;
}

export interface IBlogBanner {
  data: {
    src: string;
    alt?: string;
    title?: string;
    headerdesc?: string;
  };
  blogDate: string;
  blogCategory: [{ categorylink: string; categorytitle: string }];
}

export interface IModalShare {
  modalShare?: IModalShareData;
}

export interface IModalShareData {
  titleHeading?: string;
  src?: string;
  label?: string;
  location?: string;
  copylink?: string;
  email?: string;
  twitter?: string;
  facebook?: string;
  whatsapp?: string;
  title?: string;
  downloadurl?: string;
  downloadtext?: string;
  sharetext?: string;
}

export interface IBrandIcon {
  src?: string;
  srcMobile?: string;
  imgAlt?: string;
  caption?: string;
  status?: string;
}

export interface ICareerBanner {
  careerbannerdata: [
    {
      src: string;
      alt: string;
      srcMobile?: string;
      headerdesc?: string;
      emailLink?: string;
      buttontext?: string;
    },
  ];
}

export interface ICertificationHeader {
  data: {
    src: string;
    headerdesc: string;
    alt: string;
    srcMobile?: string;
    title?: string;
  };
}

export interface ICertificates {
  list: [
    {
      certificateID: string;
      data: [
        {
          heading: string;
          data: [
            {
              rera: [
                {
                  downloadurl: string;
                  title: string;
                  reraNumber: string;
                  reraTitle: string;
                  titleLink: string;
                  titleLinkTarget?: string;
                },
              ];
              link: string;
              src: string;
              alt: string;
              propertyName: string;
              target?: string;
            },
          ];
        },
      ];
    },
  ];
  pageUrl: string;
}

export interface ICityFeatures {
  data?: [];
}

export interface IClubSection {
  clubData: [
    {
      imgtitle: string;
      link: string;
      src: string;
      heading: string;
      subheading: string;
      ctatitle: string;
      title: string;
      mobileimage: string;
    },
  ];
}

export interface IWhyInvest {
  data?: [{ icon: string; title: string }];
}

export interface IWhyAdaniHighlightsHeading {
  iconprimary: string;
  iconsecondary: string;
  alt: string;
}

export interface ITownshipSidebar {
  readmore: string;
  readless: string;

  townshipSidebar: {
    image: {
      src: string;
      alt: string;
    };
    description: string;
    studio: {
      heading: string;
      services: [
        {
          type: string;
        },
      ];
    };
  };
}

export interface ITownshipCard {
  items: [ITownshipCardItem];
}

export interface ITownshipCardItem {
  btnLink: string;
  src: string;
  alt: string;
  imgLabel: string;
  subDesc: string;
  btnText: string;
  desc: string;
  title: string;
  mobileimage: string;
}

export interface ITownshipBanner {
  bannerData: {
    projectActions: {
      downloadurl: string;
      downloadtext: string;
      sharetext: string;
      modalTitle: string;
    };
  };
  ShantigramBanner: {
    isVideo: string;
    videoposter: string;
    logoalt: string;
    logo: string;
    thumb: string;
    thumbalt: string;
    videoMp4: string;
    videoOgg: string;
    heading: string;
    subheading: string;
    seoName?: string;
    seoDescription?: string;
    uploadDate?: string;
    imgtype?: string;
    videoposterMobile: string;
    videoMp4Mobile: string;
    videoOggMobile: string;
  };
  eventAnalyticsHandler: (event: string, clickText: string) => void;
  selectedTownship?: string;
}

export interface ITestimonialList {
  heading?: string;
  testimonialList: [ITestimonial];
}

export interface ITestimonial {
  isVideoTestimonial: string;
  iframesrc: string;
  useravtar: string;
  useravtartitle: string;
  useravtaralt: string;
  title: string;
  description: string;
  author: string;
  propertylocation: string;
}

export interface ISocialFeedsGridList {
  feedsCard: [ISocialFeedsGrid];
}

export interface ISocialFeedsGrid {
  columns: string;
  link: string;
  src: string;
  imgalt: string;
  imgtitle: string;
  heading: string;
}

export interface ISitemapLinksList {
  sitemapDetail: [ISitemapLinks];
}

export interface ISitemapLinks {
  heading: string;
  title: boolean;
  md: number;
  items: [ISitemapLinksItem];
}

export interface ISitemapLinksItem {
  title: boolean;
  keys: [{ link: string; page: string; target: string }];
}

export interface ISimilarProjects {
  src: string;
  logosrc: string;
  title: string;
  status: string;
  link: string;
  type: string;
  linkTarget: string;
}

export interface IResidentialBanner {
  data: {
    readmore: string;
    readless: string;
    description: string;
    heading: string;
    src: string;
    srcMobile?: string;
    alt: string;
    imgtitle: string;
  };
}

export interface IReraDataComponent {
  reraInfo: IReraData;
  pageUrl?: string;
  projectType?: string;
  reraHeading?: string;
}

export interface IReraData {
  reraModal?: [IReraModalData];
  rera?: IReraModalData[];
  reraWebsite?: string;
  reranumber?: string;
  reraNumber?: number;
  modalTitle?: string;
  reraWebsiteLink?: string;
  reraHeading?: string;
  downloadRera?: string;
}

export interface IReraModalData {
  url?: string;
  downloadLink?: string;
  reraid?: number | string;
  reraWebsiteLink?: string;
  qrCodeImage?: string;
  reraTitle?: string;
  title?: string;
  titleLink?: string;
  downloadurl?: string;
  reraNumber?: string;
}

export interface IReadMore {
  textLength?: number;
  readmore?: string;
  readless?: string;
  data: string;
}

export interface IProjectTabs {
  link: string;
  src: string;
  imgalt: string;
  imgtitle: string;
  imgtype: string;
  logo: string;
  title: string;
  logoalt: string;
  logotitle: string;
  location: string;
  subType: string;
  propertyType?: string;
  type?: string;
  target?: string;
  mobileimage?: string;
}

export interface IProjectNameWeb {
  projectNameData: {
    title: string;
    location: string;
    projectLink: string;
    priceLabel: string;
    discountLabel: string;
    discount: string;
    priceStartingAt: string;
    Rs: number;
    price: number;
    sup: string;
    allInclusive: string;
  };
}

export interface IProjectNameMobile {
  projectNameData: IProjectNameMobileData;
}

export interface IProjectNameMobileData {
  title: string;
  location: string;
  projectLink: string;
  priceStartingAt: string;
  Rs: number;
  price: number;
  sup: string;
  allInclusive: string;
}

export interface IProjectFeaturesList {
  data: [IProjectFeatures];
}

export interface IProjectFeatures {
  src: string;
  srcMobile: string;
  title: string;
  caption: string;
  desc: string;
  labelTerms: string;
}

export interface IProjectActions {
  projectActionData: {
    downloadPDFLink?: string;
    downloadBrochure?: string;
    downloadModalTitle?: string;
    share?: string;
    modalShare: {
      titleHeading?: string;
    };
    downloadurl?: string;
    downloadtext?: string;
    modalTitle?: string;
  };
  download?: boolean;
  eventAnalyticsHandler: (event: string, clickText?: string) => void;
  projectNameData?: string;
  propertyType?: string;
  selectedTownship?: string;
}

export interface IPageContent {
  descriptionData: string;
}

export interface IOurValuesList {
  OurValuesData: [IOurValues];
}

export interface IOurValues {
  src: string;
  alt: string;
  desc: string;
  title: string;
}

export interface IOurStories {
  stories: [];
  heading: string;
}

export interface IOurBrandsList {
  ourBrandsData: [IOurBrands];
}

export interface IOurBrands {
  src: string;
  alt: string;
  title: string;
}

export interface INriCornerIntro {
  data: {
    title: string;
    pageData: string;
  };
}

export interface IMoreArticlesList {
  data: [IMoreArticles];
}

export interface IMoreArticles {
  articleLink: string;
  articleLinkIcon: string;
  articleLinkTitle: string;
  articleThumb: string;
  articleThumbAlt: string;
  articleTitle: string;
  articleDescription: string;
  articleType: string;
}

export interface ISearchProjectMobile {
  search: string;
  reference: any;
  mobActive: any;
  handleClick?: () => void;
}

export interface ICardFilterButtons {
  Anchors: [{ link: string; title: string; slug: string }];
  filter?: string;
  setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchInputValue?: string;
  setsearchInputValue?: React.Dispatch<React.SetStateAction<string>>;
  openSearch?: boolean;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  searchData?: any;
  Id?: string;
}

export interface IClubModalData {
  imgsrc: string;
  imgalt: string;
  imgtitle: string;
  heading: string;
  description: string;
  link: string;
  linktitle: string;
  modallink: string;
  title: string;
  enquiryfield: string;
  planvisit: string;
  homeloancheck: string;
  clubdate: string;
  clubpeople: string;
  banquetfield: string;
  spafield: string;
  printNpdf: string;
}

export interface IClubDetailsAbout {
  aboutClubData: {
    heading: string;
    description: string;
    readmore?: string;
    readless?: string;
    clubLifeImageSrc?: string;
  };
}

export interface IStickyMobileMenu {
  defaultActive?: string;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  propertyType?: string;
  data?: any;
  searchData: any;
  hamburgerData: any;
  connectData: any;
  buLogo: string;
  buLink: string;
  buLogoAltText: string;
  pageName: string;
}

export interface ILeaderShipCarouselList {
  LeadersData: {
    params: {
      ComponentTitle: string;
    };
    fields: {
      title: string;
      data: [ILeaderShipCarousel];
    };
  };
}

export interface ILeaderShipCarousel {
  quote: string;
  src: string;
  imgalt: string;
  imgtitle: string;
  name: string;
  designation: string;
}

export interface ILeaderShip {
  src: string;
  imgalt: string;
  imgtitle: string;
  name: string;
  designation: string;
  quote: string;
}

export interface IHomeCityProjectDetailsList {
  projectcitydata: [IHomeCityProjectDetails];
}

export interface IHomeCityProjectDetails {
  link: string;
  src: string;
  imgAlt: string;
  imgtitle: string;
  location: string;
  projectcount: number;
}

export interface IFeaturedArticles {
  items: [IFeaturedArticlesItem];
}

export interface IFeaturedArticlesItem {
  link: string;
  category: [{ categorytitle: string }];
  src: string;
  imgalt: string;
  alt: string;
  title: string;
}

export interface IFacilitiesItem {
  title: string;
  keys: [IFacilities];
}

export interface IFacilities {
  facilityName: string;
}

export interface IContactData {
  staticText: string;
}

export interface IEmployeeCare {
  EmployeeCarelist: {
    name: string;
    description: string;
    inclusion: string;
  };
  employeeCareCardlist: {
    data: [IEmployeeCareCardItem];
  };
}

export interface IEmployeeCareCard {
  careerdata: [IEmployeeCareCardItem];
}

export interface IEmployeeCareCardItem {
  src: string;
  logo: string;
  detail: string;
  heading: string;
  alt: string;
}

export interface IErrorFallback {
  error?: string;
  showButton?: boolean;
  title?: string;
  errorMessage?: string;
}

export interface ICommunicationCornerBlog {
  data: {
    description: string;
    quote: string;
    category: [ICommunicationCornerBlogData];
  };
}

export interface ICommunicationCornerBlogData {
  categorylink: string;
  categorytitle: string;
}

export interface IExploreTownshipData {
  dataCols?: string;
  id?: number;
  src?: string;
  alt?: string;
  imgAlt?: string;
  imgtitle?: string;
}

export interface IExploreTownship {
  exploreData: [IExploreTownshipData];
  exploreTownship: {
    params: {
      ComponentTitle: string;
    };
  };
  seeallkeyword: string;
}

export interface IConnectBlock {
  canvasIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  data: [
    {
      items: [IConnectBlockData];
    },
  ];
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IConnectBlockData {
  itemLink: string;
  itemLeftIcon: string;
  itemText: string;
  itemSubText: string;
}

export interface IContactCta {
  getInTouchdata?: {
    heading?: string;
    desc?: string;
    button?: string;
  };
  propertyType?: string;
  projectNameData?: string;
}

export interface IDisclaimer {
  heading: string;
  content: string;
  btnText: string;
  disclaimerLogo: string;
  logoAlt: string;
  disclaimerHandler: () => void;
}

export interface IClubListingBanner {
  clublistingdata: {
    herobanner: [IClubListingBannerData];
  };
}

export interface IClubListingBannerData {
  isVideo: string;
  bannerImg: string;
  bannerAlt: string;
  videoMp4: string;
  videoOgg: string;
  videoposter: string;
  bannerImgtitle: string;
  seoName?: string;
  seoDescription?: string;
  uploadDate?: string;
  thumbImg?: string;
  thumbImgMobile?: string;
  videoposterMobile: string;
  videoMp4Mobile: string;
  videoOggMobile: string;
}

export interface ICommunicationCornerOtherCategories {
  communicationData: {
    fields: {
      blogs: {
        data: string;
        totalBlogs: string;
      };
    };
  };
  Id?: string;
}

export interface ICommunicationCornerOtherCategoriesData {
  link: string;
  src: string;
  imgtitle: string;
  alt: string;
  description: string;
  title: string;
  dateTime: string;
  imgTitle: string;
}

export interface IHeroAtWork {
  testimonials: {
    params: {
      ComponentTitle: string;
      TestimonialsSubTitle: string;
    };
    fields: {
      data: [ITestimonial];
    };
  };
}

export interface IResetLocationFilter {
  heading: string;
  description: string;
  buttonText: string;
  resetFilter: () => Promise<void>;
  button?: boolean;
}

export interface IPropertyDetail {
  data: any;
  propertyType: string;
}

export interface INavigationMobile {
  navigate?: {
    details: string;
  };
  projectActionData?: {
    backlink?: string;
    downloadurl?: string;
    downloadtext?: string;
    titleHeading?: string;
    src?: string;
    label?: string;
    location?: string;
    copylink?: string;
    email?: string;
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
    title?: string;
    sharetext?: string;
  };
  BackIcon?: boolean;
  BackIconwithText?: boolean;
  BackIconMobileOnly?: boolean;
  downloadandShare?: boolean;
}

export interface IOurLocation {
  location: {
    propertyTypeData?: [IOurLocationData];
    propertyType: [data: string];
    src?: string;
    imgalt?: string;
    imgtitle?: string;
    projectcity?: string;
    projectlist?: [IOurLocationData];
    seeAll?: {
      link?: string;
      title?: string;
    };
  };
}

export interface IOurLocationData {
  projectlink?: string;
  projecttitle?: string;
  priceStarting?: string;
  projectprice?: string;
  condition?: string;
  allinclusive?: string;
  propertyType?: string;
  linktarget?: string;
}

export interface IHighlights {
  CitySearchData: [IHighlightsCityData];
  currCity: string;
  locationHeading: string;
}

export interface IHighlightsCityData {
  cityname: string;
  slug: string;
  citydetail: string;
  src: string;
}

export interface IOurLocationCarousel {
  OurLocationlist: {
    fields: {
      ourProjects: {
        heading: string;
        data: [IOurLocationCarouselData];
      };
      data: [IOurLocationCarouselData];
    };
    params: {
      ComponentTitle: string;
    };
  };
}

export interface IOurLocationCarouselData {
  propertyTypeData?: [IOurLocationData];
  propertyType: [data: string];
  src?: string;
  imgalt?: string;
  imgtitle?: string;
  projectcity?: string;
  projectlist?: [IOurLocationData];
  seeAll?: {
    link?: string;
    title?: string;
  };
}

export interface IOurLocationData {
  projectlink?: string;
  projecttitle?: string;
  priceStarting?: string;
  projectprice?: string;
  condition?: string;
  allinclusive?: string;
  propertyType?: string;
}

export interface ISearchInput {
  SearchFaqByString: (e: any) => void;
  onClearSearch: () => void;
  searchRef: React.MutableRefObject<any>;
}

export interface IProjectHighlights {
  projectNameData: IProjectNameMobileData;
  projectHighlights: {
    reraData: [IReraData];
    galleryIconsData: [
      {
        icon: string;
        label: string;
        type: string;
      },
    ];
  };
  galleryModalData: IGalleryModalData;
  galleryHighlights: [IGalleryHighlightsData];
  eventAnalyticsHandler: (event: string, clickText?: string | undefined) => void;
}

export interface IGalleryModalData {
  show?: boolean;
  handleClose?: () => void;
  title?: string;
  share?: string;
  closelink?: string;
  sharelink?: string;
  modalShare: IModalShareData;
  videoCarouselData: IVideoCarouselData;
  activeTab?: string;
  eventAnalyticsHandler?: (event: string, clickText?: string | undefined) => void;
}

export interface IVideoCarouselData {
  modalSlidesData: {
    gallerydata: [{ tabType: string }];
  };
  galleryTabs: {
    data: [{ link?: string; title?: string; tabtypecount?: string | number }];
  };
  activeTab?: string;
}

export interface IVideoCarouselWithThumbnails {
  modalslidesData: {
    gallerydata: [{ tabType: string }];
  };
  galleryTabs: {
    data: [{ link?: string; title?: string; tabtypecount?: string | number }];
  };
  activeTab?: string;
}

export interface IGalleryHighlightsData {
  type: string;
  tabType: string;
  logoSrc?: string;
  logoAlt?: string;
  src?: string;
  srcMobile?: string;
  imgAlt?: string;
  logoTitle?: string;
  imgCount?: string;
  icon: string;
  iconDesc?: string;
  degree?: string;
}

export interface IProjectInfoTabs {
  TabsData: [
    {
      link: any;
      title: string;
      linktitle: string;
    },
  ];
  defaultActiveTab?: string;
}

export interface IPagelinksNavigation {
  QuickLinks: [{ [x: string]: { heading: string } }];
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  links: [{ heading: string; link: string }];
}

export interface ICustomClickAnchor {
  anchorText?: string;
  anchorLink: any;
  offset?: number;
}

export interface IPointer {
  xVal?: string;
  yVal?: string;
  text?: string;
  container?: React.RefObject<HTMLDivElement>;
}

export interface IProjectMasterLayout {
  property: {
    imgAlt?: string;
    image?: string;
    points: [{ left: string; bottom: string; title: string }];
  };
}

export interface IProjectFloorPlan {
  floorPlanData: [
    {
      src: string;
      imgAlt: string;
      points: { left: string; bottom: string; title: string }[];
      tabHeading: any;
    },
  ];
}

export interface IFloorPlanData {
  src: string;
  imgAlt: string;
  points: { left: string; bottom: string; title: string }[];
  tabHeading: string;
}

export interface ISpecification {
  projectDetails: [IProjectDetailData];
}

export interface ISpecificationCard {
  items?: IProjectDetailData;
}

export interface IProjectDetailData {
  type?: string;
  src?: string;
  imageAlt?: string;
  imgTitle?: string;
  sizeIn?: string;
  specifications?: [
    {
      place: string;
      sizeInFeet: string;
      sizeInMetres: string;
    },
  ];
  areaAsPerRera: string;
  reraMeasurementScale: string;
  reraSpecifications: [
    {
      areaType: string;
      size: string;
    },
  ];
  tabHeading?: string;
}

export interface IProjectUnitPlans {
  src?: string;
  desc?: string;
  title?: string;
  imgAlt?: string;
  link?: string;
  setShowUnitPlan: React.Dispatch<React.SetStateAction<boolean>>;
  showUnitPlan: boolean;
  index: number;
  unitPlanIndex: number;
  handleModal: (x: number) => void;
  projectDetails: [IProjectDetailData];
  setUnitPlanIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface IProjectLocation {
  projectLocation: {
    address1?: string;
    address2?: string;
    city?: string;
    pincode?: string;
    state?: string;
    country?: string;
    contact?: string;
  };
  projectTitle?: string;
  mapUrl: string;
  contactUsLabel: string;
}

export interface IEmiCalculator {
  emiCalculatorData: {
    defaultLoanAmount: string;
    defaultInterestRate: string;
    defaultLoanTenure: string;
    heading: string;
    rs: string;
    loanAmountLabel: string;
    minLoanAmount: string;
    maxLoanAmount: string;
    minLoanAmountLabel: string;
    maxLoanAmountLabel: string;
    percent: string;
    interestRateLabel: string;
    minInterestRate: string;
    maxInterestRate: string;
    minInterestRateLabel: string;
    maxInterestRateLabel: string;
    years: string;
    loanTenureLabel: string;
    minLoanTenure: string;
    maxLoanTenure: string;
    minLoanTenureLabel: string;
    maxLoanTenureLabel: string;
    interestAmountLabel: string;
    interestAmountMobileLabel: string;
    principalAmountLabel: string;
    principalAmountMobileLabel: string;
    totalPayableAmountLabel: string;
    totalPayableAmountMobileLabel: string;
    ourBankingPartnersLabel: string;
    bankingPartnersData: [{ src?: string; imgAlt?: string; imgTitle?: string }] | never[];
  };
}

export interface IOptions {
  title: string;
  body: any;
}

export interface IFaq {
  faqs: IFaqData[];
  heading?: string;
  seeall?: string;
  seeallLink?: string;
  faqLink?: string;
}

export interface IFaqData {
  title: string;
  body: string;
}

export interface ISocialSection {
  feedsdata?: { data: [ISocialFeedsGrid] };
  feedsImage?: { waveImage: string; waveImageAlt: string };
}

export interface IBanner {
  isVideo: string;
  linktitle: string;
  propertyType: string;
  propertyName: string;
  videoposter: string;
  videoOgg: string;
  videoMp4: string;
  imgtype: string;
  link: string;
  heading: string;
  subheading: string;
  thumb: string;
  thumbalt: string;
  thumbtitle: string;
  logo: string;
  logoalt: string;
  logotitle: string;
  rerano: string;
  vheading?: string;
  vsubheading?: string;
  linktarget?: string;
  seoName?: string;
  seoDescription?: string;
  uploadDate?: string;
  srcMobile?: string;
  videoposterMobile: string;
  videoOggMobile: string;
  videoMp4Mobile: string;
}

export interface ITestimonialData {
  iframesrc: string;
  item?: ITestimonialItem;
}

export interface ITestimonialItem {
  isVideoTestimonial: string;
  iframesrc: string;
  title: string;
  propertylocation: string;
  useravtar: string;
  useravtaralt: string;
  useravtartitle: string;
  description: string;
  author: string;
  imgalt?: string;
  imgtitle?: string;
  seoName?: string;
  seoDescription?: string;
  uploadDate?: string;
}

export interface IModalPopup {
  modalTitle: string;
  modalBody?: any;
  backdrop?: boolean | 'static';
  className?: string;
  modalFooter?: any;
  key?: number;
  modalSize?: any;
  onHide?: () => void;
  show?: boolean;
  closeButton?: boolean;
}

export interface IMainbanner {
  bannerData: {
    fields: {
      data: [IMainbannerItem];
    };
  };
  parent: string;
}

export interface IMainbannerItem {
  isVideo: string;
  parent: string;
  linktitle: string;
  propertyType: string;
  propertyName: string;
  videoposter: string;
  videoOgg: string;
  videoMp4: string;
  imgtype: string;
  link: string;
  heading: string;
  subheading: string;
  thumb: string;
  thumbalt: string;
  thumbtitle: string;
  logo: string;
  logoalt: string;
  logotitle: string;
  rerano: string;
  vheading: string;
  vsubheading: string;
  linktarget: string;
  seoName?: string;
  seoDescription?: string;
  uploadDate?: string;
  srcMobile?: string;
  videoposterMobile: string;
  videoOggMobile: string;
  videoMp4Mobile: string;
}

export interface IQuicklinksOffCanvas {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  links: [IQuicklinksData];
  pageData: [IQuicklinksPageData];
}

export interface IQuicklinksData {
  heading: string;
  link: string;
}

export interface IQuicklinksPageData {
  [x: string]: { heading: string };
}

export interface ISearchDropdown {
  inputValue: string;
  setinputValue?: React.Dispatch<React.SetStateAction<string>>;
  openSearch?: boolean;
  show?: boolean;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  searchData: [ISearchData];
}

export interface ISearchData {
  slug: string;
  role: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

export interface IEnquiryFormHelper {
  enquiryfield?: boolean;
  planvisit?: boolean;
  homeloancheck?: boolean;
  typeDropdown?: boolean;
  configuration?: boolean;
  projectType?: boolean;
  purpose?: boolean;
  completeName?: boolean;
  firstlastname?: boolean;
  doubleColumn?: boolean;
  singleColumn?: boolean;
  agreeToConnect?: boolean;
  isPopup?: boolean;
  isContactUs?: boolean;
  brochureForm?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  propertyType?: string;
  propertyLocation?: string;
  projectNameData?: string;
  showForm?: boolean;
  downloadBrochure?: () => void;
  selectedTownship?: string;
  autoPopup?: boolean;
  isProjectCompleted?: boolean;
}

export interface IEnquiryFormData {
  enquireNow: string;
  planAVsiit: string;
  contactUsTitle: string;
  propertyLabel: string;
  shareContact: string;
  sendusQuery: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  projectType: string;
  projectTypeOptions: IProjectTypeOption[];
  selectPropertyType: string;
  propertyTypeOptions: IProjectTypeOption[];
  agreeToConnect: string;
  overrideRegistry: string;
  submitDetail: string;
  selectProjectProperty: string;
  configuration: string;
  startDate: string;
  homeLoanInterested: string;
  timeSlots: string;
  timeSlotsOptions: IProjectTypeOption[];
  date: string;
  from: string;
  to: string;
  heading: string;
  para: string;
  printLabel: string;
  saveaspdfLabel: string;
  doneButtonLabel: string;
  mobileLabel: string;
  submitButtonText: string;
  enterOTPLabel: string;
  wehavesentviaSMStoLabel: string;
  havenotreceivedaOTPLabel: string;
  editButtonLable: string;
  resendButtonLabel: string;
  purposeLabel: string;
  errorMessageTitle: string;
  errorMessageDesription: string;
  purposeList: IProjectTypeOption[];
  errorData: IErrorData;
  brochureFormDescription?: string;
  brochureThankyouDescription?: string;
  brochureHeading?: string;
  popupSubTitle: string;
  description?: string;
  continueLabel?: string;
  cancelLabel?: string;
  messageLabel?: string;
  messageMaxLength?: number;
}

export interface IErrorData {
  name: string;
  fname: string;
  lname: string;
  email: string;
  phoneNo: string;
  projectType: string;
  projectName: string;
  configuration: string;
  timeslot: string;
  contactAdaniRealty: string;
  purpose: string;
  planAVsiit: string;
  messageError?: string;
}

export interface IProjectTypeOption {
  id: string;
  value: string;
  controllerName: null | string;
}

export interface ICountryFlagsApiData {
  countryName: string;
  dialCode: string;
  isO3: string;
  isO2: string;
  currencyName: string;
  currencyCode: string;
  untermEnglish: string;
  regionName: RegionName;
  capital: string;
  continent: Continent;
  tld: string;
  languages: string;
  isDeleted: boolean;
  id: string;
  countryFlagImage: string;
  contactNoLength: string;
}

export interface ICountryFlags {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
  contactNoLength: string;
}

export interface ILocationEnquiryFormData {
  carouselImages: null;
  data: ILocationFormData;
}

export interface ILocationFormData {
  propertyID: string;
  link: string;
  propertyLocation: string;
  rera: Rera;
  propertyStatus: PropertyStatus;
  propertyStatusID: PropertyStatusID;
  projectName: string;
  projectSpec: string;
  areaLabel: AreaLabel;
  priceLabel: PriceLabel;
  areaDetail: string;
  priceDetail: string;
  onwards: Onwards;
  propertyPricefilter: number;
  propertyPrice: string;
  propertyConfiguration: string[];
  propertyType: string;
  propertyConfigurationFilter: string[];
  propertyStatusFilter: PropertyStatusFilter;
  propertyTypeFilter: PropertyTypeFilter;
  condition: Condition;
}

export interface ISelectProperty {
  label: string;
  placeholder: string;
  options?: {
    [key: string]: any;
    label?: string;
    key?: string;
  }[];
  selected?: string;
  setSelected?: (selected: string) => void;
  image?: string;
  width?: string;
  menuWidth?: string;
  disabled?: boolean;
  inputRef?: any;
  error?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  disabledStyle?: boolean;
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentValue?: string;
  setConfigurationFilterData?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export interface IPropertyEnquiryForm {
  enquiryfield?: boolean;
  planvisit?: boolean;
  homeloancheck?: boolean;
  typeDropdown?: boolean;
  configuration?: boolean;
  projectType?: boolean;
  purpose?: boolean;
  completeName?: boolean;
  firstlastname?: boolean;
  doubleColumn?: boolean;
  singleColumn?: boolean;
  agreeToConnect?: boolean;
  showHeading?: boolean;
  brochureForm?: boolean;
  onSubmit: (data?: any) => any;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  locationData: ILocationEnquiryFormData[];
  selectedPropertyType: string;
  setselectedPropertyType: React.Dispatch<React.SetStateAction<string>>;
  timeslotData: string;
  setTimeSlotData: React.Dispatch<React.SetStateAction<string>>;
  countryFlags: ICountryFlags[];
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  projectNameValue?: string;
  setValue: UseFormSetValue<any>;
  getCurrentDate: () => string;
  heading?: string;
  isPopup?: boolean;
  selectedTownship?: string;
  township?: string;
  isContactUs?: boolean;
  autoPopup?: boolean;
  showCompletedProjectPopup?: boolean;
  continueWithForm?: () => void;
  handleCancelOnCompletedProject?: () => void;
}

export interface IMobileNumber {
  phoneNumber?: string;
  countryCode?: string;
}

export interface IOtpInput {
  enquireFormData: IEnquiryFormData;
  submit: (inputOtp: string) => Promise<void>;
  onHide: () => void;
  mobileNumber: IMobileNumber | null;
  resend: () => Promise<void>;
  otpErr: string;
  disableForm?: boolean;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  timer: number;
}

export interface IModalFilter {
  locationFilterData: any;
  allProperties: any;
  setfilteredProperties: React.Dispatch<React.SetStateAction<any[]>>;
  clearFilterData: () => void;
  setshow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedResidentialMinPrice: number | null;
  setselectedResidentialMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
  selectedResidentialMaxPrice: number | null;
  setselectedResidentialMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCommercialMinPrice: number | null;
  setselectedCommercialMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCommercialMaxPrice: number | null;
  setselectedCommercialMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
  currTab: string;
  setCurrTab: React.Dispatch<React.SetStateAction<string>>;
  commercialSelected: ISelectedFilters;
  setcommercialSelected: React.Dispatch<React.SetStateAction<ISelectedFilters>>;
  residentialSelected: ISelectedFilters;
  setresidentialSelected: React.Dispatch<React.SetStateAction<ISelectedFilters>>;
  previousCommercialFilterState: any;
  setpreviousCommercialFilterState: React.Dispatch<any>;
  previousResidentialFilterState: any;
  setpreviousResidentialFilterState: React.Dispatch<any>;
  setTotalFiltersSelected: React.Dispatch<React.SetStateAction<number>>;
  clearAllLabel: string;
  applyFilterLabel: string;
  filteredTabtype: string | null;
  status: string | null;
  resetPropertyStatus: () => void;
}

export interface IProjectlist {
  configurationTiles: [[IProjectlistConfiguration]];
}

export interface IProjectlistConfiguration {
  title: string;
  keys: [IProjectlistData];
}

export interface IProjectlistData {
  link: string;
  keyword: string;
}

export interface IPropertyTabCarousel {
  propertyAll: {
    fields: {
      data: any;
      param: {
        ressOffer: string;
      };
    };
    params: {
      SeeAllLink: string;
      SeeAllKeyword: string;
      AllKeyword: string;
      commInOtherCity: string;
      ressInOtherCity: string;
      ComponentTitle: string;
    };
  };
  propertyType: string;
  isSeoPage?: boolean;
}

export interface IModalThankYou {
  enquireFormData?: IEnquiryFormData;
  thankyouData: any;
  handleThankYouClick: () => void;
  brochureForm?: boolean;
}

export interface IPageContentFaq {
  faqData: [IPageContentFaqData];
  focusId?: string;
  focusCat?: string;
  noResultFound: {
    heading: string;
    description: string;
  };
}

export interface IPageContentFaqData {
  category: string;
}

export interface IProjects {
  propertyType: string;
  data: any;
}

export interface IEvents {
  data: any;
}

export interface IblogDisclaimer {
  blogData: any;
}

export interface ICookiesLayer {
  setIsCookie?: any;
  cookieHandler?: any;
  setshowDecline?: any;
}

export interface ICustomImage {
  type?: string;
  src: string;
  alt?: string;
  title?: string;
  itemProp?: string;
  className?: string;
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
  objectFit?: any;
  width?: string | number | any;
  height?: string | number | any;
  priority?: boolean;
  onClick?: any;
  lazy?: boolean | string;
  ref?: React.MutableRefObject<HTMLImageElement>;
  fetchpriority?: any;
}

export interface IFilterContent {
  currTabFilter: any;
  index: number;
  residentialHandleSubmit: any;
  commercialHandleSubmit: any;
  applyAllFiltersHandler: (filterType: string) => void;
  getPriceResidential: (price: { minPrice: number; maxPrice: number }) => void;
  getPriceCommercial: (price: { minPrice: number; maxPrice: number }) => void;
  selectedResidentialMinPrice: number | null;
  selectedResidentialMaxPrice: number | null;
  selectedCommercialMinPrice: number | null;
  selectedCommercialMaxPrice: number | null;
  setselectedResidentialMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setselectedResidentialMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setselectedCommercialMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setselectedCommercialMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
  residentialControl: any;
  commercialControl: any;
  residentialSelected: ISelectedFilters;
  commercialSelected: ISelectedFilters;
  commercialSetValue: any;
  residentailSetValue: any;
  handleButtonClick: (propertyType: string, buttonType: string, buttonLabel: string) => void;
  clearAllFiltersHandler: (currFilterTab: string) => void;
  clearAllLabel: string;
  applyFilterLabel: string;
  status: string | null;
}

export interface ICollapsePanel {
  sectionItem?: any;
  onClappseClick?: any;
  pageName?: string;
}

export interface IHamburger {
  menuData?: any;
  buLogo?: string;
  buLink?: string;
  buLogoAltText?: string;
  pageName?: string;
}

export interface INavBar {
  navData?: any;
  menuData?: any;
  buLogo?: string;
  buLink?: string;
  buLogoAltText?: string;
  buPrimaryNavCallback: () => void;
  pageName?: string;
  searchData?: any;
  reference?: React.MutableRefObject<HTMLDivElement | null>;
  searchActive?: boolean;
  isBordered?: boolean;
}

export interface IHeader {
  isAbsolute?: boolean;
  isStatic?: boolean;
  addOnClass?: string;
  back?: boolean;
  buLogo?: string;
  buLink?: string;
  buLogoAltText?: string;
  buBackBtnText?: string;
  buBackBtnLink?: string;
  buPrimaryNavCallback: () => void;
  navData?: any;
  topbarList?: any;
  menuData?: any;
  scrollOnAbsolute?: boolean;
  stopHeaderAnimate?: boolean;
  waitForSticky?: boolean;
  searchData?: any;
  reference?: React.MutableRefObject<HTMLDivElement | null>;
  searchActive?: boolean;
  isBordered?: boolean;
}

export interface ILogo {
  buLogo?: string;
  buLink?: string;
  buLogoAltText?: string;
}

export interface IMainNav {
  navData: any;
  buPrimaryNavCallback: () => void;
  pageName?: string;
}

export interface INavBrand {
  menuData?: any;
  buLogo?: string;
  buLink?: string;
  backIcon?: boolean;
  handleBackIcon?: () => void;
  buLogoAltText?: string;
  pageName?: string;
  searchData?: any;
  reference?: React.MutableRefObject<HTMLDivElement | null>;
  searchActive?: boolean;
  isBordered?: boolean;
}

export interface IBreadcrumb {
  list: any;
  classname?: string;
  showOnMobile?: boolean;
}

export interface IDisclaimerSection {
  imageDisclaimer: string;
  emiDisclaimer: string;
  headingDisclaimer: string;
}

export interface ICheckBoxWithLabel {
  control: Control<any, any>;
  controlName: string;
  id: string;
  label: string;
  errors?: any;
  errorMsg?: string;
}

export interface IPlanAVisitForm {
  onSubmit: (data?: any) => Promise<void>;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  timeslotData: string;
  setTimeSlotData: React.Dispatch<React.SetStateAction<string>>;
  countryFlags: ICountryFlags[];
  setValue: UseFormSetValue<any>;
  getCurrentDate: () => string;
  deviceType: string;
}

export interface IDateInput {
  control: Control<any, any>;
  controlName: string;
  label: string;
  errors: any;
  errorMsg: string;
  setValue: UseFormSetValue<any>;
  updateControlName: string;
  selectedMinDate: Date | undefined;
  deviceType: string;
  setTimeSlotData: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  maxDate: Date;
}

export interface ISingleColumnForm {
  showHeading?: boolean;
  onSubmit: (data?: any) => Promise<void>;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  countryFlags: ICountryFlags[];
  setValue: UseFormSetValue<any>;
  locationData: ILocationEnquiryFormData[];
  selectedPropertyType: string;
  setselectedPropertyType: React.Dispatch<React.SetStateAction<string>>;
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  projectNameValue?: string;
  heading?: string;
  isPopup?: boolean;
}

export interface IDoubleColumnEnquiryForm {
  showHeading?: boolean;
  onSubmit: (data?: any) => Promise<void>;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  countryFlags: ICountryFlags[];
  setValue: UseFormSetValue<any>;
  locationData: ILocationEnquiryFormData[];
  selectedPropertyType: string;
  setselectedPropertyType: React.Dispatch<React.SetStateAction<string>>;
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  projectNameValue?: string;
  autoPopup?: boolean;
}

export interface IContactUsForm {
  showHeading?: boolean;
  onSubmit: (data?: any) => Promise<void>;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  countryFlags: ICountryFlags[];
  heading?: string;
  isPopup?: boolean;
  locationData: ILocationEnquiryFormData[];
  setValue: UseFormSetValue<any>;
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  projectNameValue?: string;
}

export interface IBrochureForm {
  onSubmit: (data?: any) => Promise<void>;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  countryFlags: ICountryFlags[];
  setValue: UseFormSetValue<any>;
  locationData: ILocationEnquiryFormData[];
  selectedPropertyType: string;
  setselectedPropertyType: React.Dispatch<React.SetStateAction<string>>;
  setProjectNameValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  projectNameValue?: string;
  selectedTownship?: string;
}

export interface ITimeslotsInput {
  control: Control<any, any>;
  controlName: string;
  errors: any;
  errorMsg: string;
  setTimeSlotData: React.Dispatch<React.SetStateAction<string>>;
  heading: string;
  options: any;
  timeslotData: string;
}

export interface ITextInput {
  control: Control<any, any>;
  errors: any;
  errorMsg: string;
  validatorRegex: RegExp;
  label: string;
  getValues: UseFormGetValues<any>;
  controlName: string;
  allowedMaxLength?: number;
}

export interface GRITextInput {
  control: Control<any, any>;
  errors: any;
  errorMsg: string;
  placeholder:string;
  label?: string;
  getValues: UseFormGetValues<any>;
  controlName: string;
  allowedMaxLength?: number;
  type : string;
  validationRegex:RegExp;
}

export interface GRIMobileInput {
  control: Control<any, any>;
  errors: any;
  errorMsg: string;
  placeholder:string;
  label?: string;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  controlNameCode: string;
  controlNamePhone: string;
  allowedMaxLength?: number;
  defaultValue:string;
}

export interface IMultipleOptionSingleInput {
  heading: string;
  control: Control<any, any>;
  errorMsg: string;
  options: any;
  onChangeOption: any;
  selectedOption: string;
  errors: any;
  controlName: string;
}

export interface IMultipleOptionMultipleInput {
  heading: string;
  options: any;
  control: Control<any, any>;
  controlName: string;
  errorMsg: string | boolean;
  onChangeOption: any;
  errors: any;
  showError?: boolean;
}

export interface IMobileNumberInput {
  control: Control<any, any>;
  getValues: UseFormGetValues<any>;
  errors: any;
  enquireFormData: IEnquiryFormData;
  countryFlags: ICountryFlags[];
}

export interface IDrawResult {
  drawResultData: {
    heading?: string;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imgAlt?: string;
  };
  id?: string;
}

export interface ICustomIcon {
  iconName?: string;
  classname?: string;
}

export interface IPage {
  data: any;
  error?: string;
  errorMessage?: string;
  id?: string;
  pageHeading?: string;
  type?: string | null;
  status?: string | null;
  cookieData?: any;
  disclaimerData?: any;
  faqData?: any;
  privacyData?: any;
  termsData?: any;
  category?: string;
  breadcrumbsData?: { label: string; href: string }[];
  device?: string;
  activeTab?: string;
}

export type IPrice = string | undefined | null;

export interface ICountryFlagDropdown {
  selectedCountry?: ICountryFlags;
  selectCountry: (i: ICountryFlags) => void;
  options: ICountryFlags[];
  countryLabel: React.RefObject<HTMLDivElement>;
  setCountryDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICountrySprite {
  code?: string;
}

export interface IMobileInput {
  selectedCountryCode?: string;
  label?: string;
  countryCode?: boolean;
  onChangeMobileNumber?: (e: IMobileNumberData) => void;
  onBlur?: () => void;
  errorMessage?: string;
  options?: ICountryFlags[];
  isDropdown?: boolean;
  controlProps?: any;
  contactNoLen?: number;
  isClear?: boolean;
  inputClass?: string;
  name?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  errors?: any;
  phoneNumber?: string;
  setPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  onErase?: any;
  placeholder?: string;
}

export interface IMobileNumberData {
  phoneNumber?: string;
  countryCode?: string;
  alpha2Code?: string;
}

export interface IBackHeader {
  handleClick(): any;
  showBack?: boolean;
}

export interface IBreadcrumbItem {
  children?: ReactNode;
  active: boolean;
  className?: string;
  elementshimmer: string;
}

export interface IBreadcrumbs {
  list?: any;
  onItemClick?: (e?: any) => void;
  className?: string;
  itemProps?: any;
  showOnMobile?: boolean;
  isLoading?: boolean;
}

export interface IButton {
  children?: any;
  className?: string;
  ripple?: boolean | string;
  onClick?: (e?: any) => void;
  rippleClass?: string;
  loading?: boolean;
  icon?: string;
  iconPosition?: string;
  auto_id?: number;
  variant?: string;
  ref?: any;
  disabled?: any;
  size?: any;
  showClose?: boolean;
  type?: 'button' | 'submit' | 'reset';
  itemProp?: string;
  href?: string;
}

export interface ICarouselArrows {
  className?: string;
  onClick?(): void;
  classes?: string;
  arrowAutoId?: string;
  propDeviceType?: string;
}

export interface ICarousel {
  settings: {
    dots?: boolean;
    centerMode?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    speed?: number;
    swipe?: boolean;
    pauseOnHover?: boolean;
    autoplaySpeed?: number;
    arrowClasses?: string;
    forwardArrowAutoId?: string;
    backwardArrowAutoId?: string;
    responsiveSettings?: object;
    responsive?: any[];
    classes?: string;
    fade?: boolean;
    lazyLoad?: string;
    appendDots?: any;
    customPaging?: string | number | any;
    initialSlide?: any;
    accessibility?: boolean;
    cssEase?: string;
    afterChange?: any;
    beforeChange?: any;
    centerPadding?: string;
  };
  isMobSlider?: boolean;
  ulClassName?: string;
  children?: any;
  carRef?: any;
  onClick?: () => void;
  propDeviceType?: string;
  className?: string;
  classes?: string;
}

export interface IFloatingInput {
  type?: string;
  onChange?: (e?: any) => void;
  inputRef?: any;
  className?: string;
  controlId?: string;
  label?: string;
  placeholder?: string;
  controlProps?: any;
  isInvalid?: boolean;
  errorMsg?: string;
  isClear?: boolean;
  name?: string;
  value?: string;
  onClear?: () => void;
  onClick?: (e?: any) => void;
  onBlur?: (e?: any) => any;
  onFocus?: (e?: any) => any;
  ref?: React.MutableRefObject<null>;
  disabled?: boolean;
}

export interface IFloatingLabelContainer {
  children? : ReactNode;
  placeholder?: string;
  className?: string;
  hasValue?: string | boolean | number;
  iconText?: string;
  floatingContainerAutoId?: string;
}

export interface IIconButton {
  children: ReactNode;
  onClick?: (e?: any) => void;
  ripple?: boolean;
  ariaLabel?: string;
  className?: string;
  itemProp?: string;
}

export interface ILoader {
  bg?: string;
}

export interface IOffcanvas {
  placement?: any;
  title?: string;
  header?: any;
  showCanvas?: any;
  onHide?: () => void; 
   children?: ReactNode;
  closeButton?: boolean;
  footer?: any;
  className?: string;
  headerProps?: any;
  titleProps?: any;
  bodyProps?: any;
  footerProps?: any;
  bodySpacing?: boolean;
  height?: string | number;
  offCanvasAutoId?: any;
  show?: boolean;
  autoId?: number;
  backdrop?: string;
}

export interface IRangeFilter {
  min?: number;
  max?: number;
  getprice?: any;
  selectedmaxrange?: number | null;
  selectedminrange?: number | null;
  step?: number;
}

export interface IRipple {
  children? : ReactNode;
  classes?: string;
  onClickHandler?: any;
}

export interface ISectionHeader {
  heading?: string;
  children?: ReactNode;
  h1?: boolean;
  className?: string;
  itemProp?: string;
  id?: string;
}

export interface ICustomHeader {
  children: ReactNode;
  heading?: string;
  classNames?: string;
}

export interface ISelectDropdown {
  onFocus?: (e?: any) => void;
  onBlur: () => void;
  onChange: (e?: any) => void;
  label: string;
  className?: string;
  errMsg?: string;
  options: any;
  defaultValue?: string;
  controlID?: string;
  selected?: string;
  errorMessage?: string;
}

export interface IVerticalTabs {
  HandleManageDetails?: any;
  defaultActiveKey?: number | string;
  tabData?: any;
  className?: string;
  isClick?: boolean;
  horizontalTabView?: boolean;
  onClick?: (e?: any) => void;
  onItemClick?: (e?: any) => void;
  autoIds?: any;
  ripple?: boolean | string;
  transition?: boolean;
  isItemAdded?: boolean;
}

export interface IDatePicker {
  selectedDate?: string;
  withFormat?: boolean;
  inline?: boolean;
  onChange?: any;
  className?: string;
  dateFormat?: string;
  showPopperArrow?: boolean;
  startYear?: number;
  totalYearDropdownValues?: number;
  showMonthYear?: boolean;
  showMonth?: boolean;
  showYear?: boolean;
  nonEditable?: boolean;
  auto_id_data_text?: string;
  auto_id_data_datePicker?: string;
  placeholder?: string;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  offCanvasHeight?: number;
  ariaLabeledby?: string;
  minDate: Date | null;
  maxDate: Date | null | undefined;
  startDate: Date | null | undefined;
  onChangeRaw?(event: React.FocusEvent<HTMLInputElement>): void;
}

export interface IAccordionItem {
  className?: string;
  title: string;
  body: string;
  index: number;
  eventKey?: any;
  titleAutoId: string;
  headerProps?: object;
  bodyAutoId: string;
  bodyProps?: any;
  htmlRequired: boolean;
  schemaProps: object;
}

export interface IAccordionList {
  list?: any;
  activeIndex?: any;
  isShowButton?: boolean;
  buttonAt?: any;
  faqUrl?: any;
  className?: string;
  htmlRequired?: any;
  schemaProps?: object;
  target?: string;
}

export interface IFooter {
  seoContents?: any;
  mainNavigations?: any;
  payments?: any;
  socialLinks?: any;
  download?: any;
  copyRight?: any;
  contactus?: any;
  buCopyright?: any;
  largeFooter?: boolean;
  quickLinks?: any;
  usingPropsData?: boolean;
  layoutBasePath?: string;
  isRealty?: boolean;
  rerquireBottomMargin?: boolean;
}

export interface ITopBar {
  topbarList?: any;
  back?: boolean;
  buBackBtnText?: string;
  buBackBtnLink?: any;
  pageName?: any;
}

export interface ISelectDropDown {
  label: string;
  placeholder: string;
  options?: {
    [key: string]: any;
    label?: string;
    key?: string;
  }[];
  selected?: string;
  setSelected: (selected: string) => void;
  width?: string;
  menuWidth?: string;
  disabled?: boolean;
  inputRef?: any;
  error?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  disabledStyle?: boolean;
  open?: boolean;
  delay?: number;
}

export interface ICompletedProjectsList {
  projectID: string;
  data: {
    heading: string;
    data: ICompletedProjectsListItem[];
  }[];
}

export interface ICompletedProjectsListItem {
  imageSource: string;
  imageAlt: string;
  projectName: string;
  link?: string;
  target?: string;
  projectArea: string;
  areaDesc: string;
  areaTitle: string;
}
export interface IExploreShantigram {
  highlights: any;
}

export interface INriCornerDetails {
  data: any;
}

export interface IConfiguration {
  heading: string;
  link?: string;
  linkTarget?: string;
  items: {
    linkUrl: string;
    linkTitle: string;
    target?: string;
  }[];
}

export interface IHighlightHeading {
  compData: {
    heading: string;
    cityDetail: string;
  };
}

export interface IGoodnessBanner {
  srcMobile?: string;
  src: string;
  alt: string;
  heading: string;
  description: string;
  link: string;
  target?: string;
  linkTitle: string;
}

export interface IGrievanceForm {
  srcMobile?: string;
  src: string;
  alt: string;
  heading: string;
  description: string;
  link: string;
  target?: string;
  linkTitle: string;
  formFields: any;
  formHeading: string;
  subHeading:string;
}

export interface IEnviromentComponent {
  envInfo: IEnvData;
  pageUrl?: string;
  projectType?: string;
  reraHeading?: string;
}

export interface IEnvData {
  envModal?: IEnviromentData[];
  envHeading?: string;
  downloadEnv?: string;
}

export interface IEnviromentData {
  url: string;
  downloadurl?: string;
  envMonth?: string;
  download?: string;
  envMonthTarget?: string;
}

export interface IOtpData {
  MobileNumber: string;
  Name: string;
  Email: string;
  reResponse?: any;
}
