import { Button } from '@components';
import { IErrorFallback } from '@interfaces';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import styles from './error.module.scss';

const ErrorFallback = (props: IErrorFallback) => {
  const { title, error, showButton = true, errorMessage } = props;
  return (
    <>
      <Container className={styles.pageLoadErrorContainer}>
        <Head>
          <title>Adani Realty : {error}</title>
        </Head>
        <div className={styles.emptyWrapper}>
          <figure>
            <img
              src={'https://www.adanirealty.com/~/media/Foundation/Adani/emptyImages/404.gif'}
              alt="Fail to load data"
            />
          </figure>
          <h6>{title ? title : 'Failed to Load Data'}</h6>
          <p>{error}</p>
          {showButton && (
            <Button
              onClick={() => {
                typeof window !== 'undefined' && window.location.reload();
              }}
              size="md"
              variant="outline-secondary"
            >
              Try again
            </Button>
          )}
        </div>
      </Container>
      <Container>
        <div className={`d-none ${styles.errorMsg}`}>{errorMessage}</div>
      </Container>
    </>
  );
};
export default ErrorFallback;
