import { Button } from '@components';
import { IContactCta } from '@interfaces';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './ContactCta.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const ContactCta = (props: IContactCta) => {
  const { getInTouchdata, propertyType = '', projectNameData = '' } = props;
  const { sendEvent } = useGTM();
  const [show, setShow] = useState(false);
  const [pageUrl, setPageUrl] = useState<string>('');

  useEffect(() => {
    const path: string | any =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');
  }, []);

  return (
    <div className={styles.contactCta}>
      <Container>
        <h2 itemProp="headline">{getInTouchdata?.heading}</h2>
        <p itemProp="about">{getInTouchdata?.desc}</p>
        <Button
          onClick={() => {
            setShow(!show);
            const eventVal = {
              event: 'enquire_now',
              category: 'realty_hp',
              sub_category: 'top_navigation',
              page_type: pageUrl,
              click_text: 'Enquire Now',
            };
            sendEvent(eventVal);
          }}
        >
          {getInTouchdata?.button}
        </Button>
        {show && (
          <EnquiryFormHelper
            isPopup={true}
            setShow={setShow}
            propertyType={propertyType}
            projectNameData={projectNameData}
            showForm={show}
          />
        )}
      </Container>
    </div>
  );
};
export default ContactCta;
