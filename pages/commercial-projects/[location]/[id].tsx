import { ENDPOINT, getAllAPI } from '@api-manager';
import { ErrorFallback, Loader, PropertyDetail } from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import 'slick-carousel/slick/slick.css';

const PropertyDetailPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  return (
    <>
      <PropertyDetail data={data} propertyType={'commercial'} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    let id = Context.req.url;
    id = id?.substring(0, id.indexOf('?')) || id;
    const res = await getAllAPI([ENDPOINT.propertydetailLayout + '&item=/sitecore/content/AdaniRealty/Home' + id]);
    const data = filterData(res);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default PropertyDetailPage;
