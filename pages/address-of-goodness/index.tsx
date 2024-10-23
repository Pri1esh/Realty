import { ENDPOINT, getAllAPI } from '@api-manager';
import { ErrorFallback, GoodnessAddress, Loader } from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';

const AddressOfGoodness: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );
  return <GoodnessAddress compData={data} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.theGoodLifeLayout]);
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
        error: 'Uh oh! Looks like there is some network issue.',
        errorMessage: JSON.stringify(error),
      },
    };
  }
};
export default AddressOfGoodness;