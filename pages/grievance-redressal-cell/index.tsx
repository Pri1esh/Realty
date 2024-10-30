import {
  Breadcrumbs,
  ErrorFallback,
  GrievanceForm,
  Layout,
  Loader,
} from "@components";
import type { GetServerSideProps, NextPage } from "next";

import { ENDPOINT, getAllAPI } from "@api-manager";
import { IPage } from "@interfaces";
import { filterData } from "@utils";
import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
const EnquiryFormHelper = dynamic(() =>
  import("src/components/Modal/contactCtaModal/enquiryFormHelper")
);

const GrievanceRedressalCell: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={"#000000"} />
      </div>
    );
  // ImagewithText
  const {
    officesData,
    Greivance,
    Achievements: achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    seoData = {},
    searchData,
    AboutAdaniHome,
  } = data;
  return (
    <div
      className="contactUs"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <Container>
          {breadCrumbList?.fields && (
            <Breadcrumbs list={breadCrumbList?.fields} />
          )}

          <GrievanceForm compData={Greivance?.fields} />
        </Container>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.grievancePageLayout]);
    const data = filterData(res);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: "Uh oh! Looks like there is some network issue.",
        errorMessage: JSON.stringify(error),
      },
    };
  }
};

export default GrievanceRedressalCell;
