import { ENDPOINT, getAllAPI } from '@api-manager';
import { ErrorFallback, Loader, Location } from '@components';
import { IPage } from '@interfaces';
import { filterData as filterApiData } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const PCICPage: NextPage<IPage> = (props) => {
  const { data, id, error, errorMessage, type, status } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  return <Location compData={{ data, id, type, status }} />;
};

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    let id = Context.req.url;
    // id = id?.replace('-pcic', '');
    id = id?.substring(0, id.indexOf('?')) || id;

    const url = `${ENDPOINT.seoPageLayout}${id}`;
    const res = await getAllAPI([url]);
    const data = filterApiData(res);
    data['propertyListing'] = data?.SeoPropertyListing;

    if (data?.propertyListing?.fields?.length === 0 && data?.locationbanner?.fields?.length === 0) {
      return {
        redirect: {
          destination: '/404',
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        data,
        id,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        statusCode: 301,
      },
    };
  }
};
export default PCICPage;
