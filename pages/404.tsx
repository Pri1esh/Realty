import { ErrorFallback, Layout } from '@components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
const PageNotFound: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath !== '/404') {
      router.replace('/404');
    }
  }, [router]);
  return (
    <div>
      <Layout showHeader={false} showFooter={false} showBackHeader={false}>
        <Container>
          <div className="section-row">
            <ErrorFallback
              title="Looks like you are lost!"
              showButton={false}
              error="The page you are looking for doesn't exist."
            />
          </div>
        </Container>
      </Layout>
    </div>
  );
};
export default PageNotFound;
