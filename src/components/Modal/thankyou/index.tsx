import { Button } from '@components';
import { IModalThankYou } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { useRef } from 'react';
import styles from './thankyou.module.scss';

const ModalThankYou = (props: IModalThankYou) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { enquireFormData, thankyouData, brochureForm = false, handleThankYouClick } = props;

  return (
    <>
      <div className={`printPage ${styles.orderConfirm}`} ref={componentRef}>
        <div className={styles.orderConfirmation}>
          <header className={`${styles.orderHeader} ${brochureForm ? 'border-0' : ''}`}>
            <ul>
              <li>
                <span className="no-print">{getIconFromIconName('Tick')}</span>
              </li>
              <li>
                <h3>{enquireFormData?.heading}</h3>
                <p>{brochureForm ? enquireFormData?.brochureThankyouDescription : enquireFormData?.para}</p>
              </li>
            </ul>
          </header>
          {!brochureForm && (
            <div className={styles.orderDetails}>
              <ul>
                {Object.keys(thankyouData).map(
                  (item: any, index: number) =>
                    thankyouData[item] && (
                      <li key={`${item + index}`}>
                        <label>{item}</label>
                        {thankyouData[item]}
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}
        </div>
        <div className={`no-print  ${styles.exploreMore}`}>
          <Button
            variant="primary"
            size="lg"
            aria-label="Close"
            onClick={handleThankYouClick}
            className={`${brochureForm ? styles.btnThankyou : ''}`}
          >
            {enquireFormData?.doneButtonLabel}
          </Button>
        </div>
      </div>
    </>
  );
};
export default ModalThankYou;
