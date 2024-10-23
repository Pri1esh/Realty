import { ENDPOINT, getAllAPI } from '@api-manager';
import { ErrorFallback, Loader, Location } from '@components';
import { IPage } from '@interfaces';
import { filterData as filterApiData } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const LocationPage: NextPage<IPage> = (props) => {
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
    const id = Context.query.id;
    const type = Context.query.type || null;
    const status = Context.query.status || null;
    let url = ENDPOINT.locationLayout + '&location=' + id;

    switch (true) {
      case type !== null && status !== null:
        url = url + `&type=${type}&status=${status}`;
        break;
      case type !== null:
        url = url + `&type=${type}`;
        break;
      case status !== null:
        url = url + `&status=${status}`;
        break;
      default:
        url = url + '';
        break;
    }

    const res = await getAllAPI([url]);
    const data = filterApiData(res);

    if (data?.propertyListing?.fields?.length === 0 && data?.locationbanner?.fields?.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
        id,
        type,
        status,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default LocationPage;
