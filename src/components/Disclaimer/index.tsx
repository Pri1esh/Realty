import { Button, CustomImage } from '@components';
import { IDisclaimer } from '@interfaces';
import styles from './disclaimer.module.scss';

const Disclaimer = (props: IDisclaimer) => {
  return (
    <div className="disclaimerPopup">
      <div className={styles.backdrop}></div>
      <div className={styles.disclaimer}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className={styles.title}>
              {props?.disclaimerLogo && (
                <CustomImage
                  itemProp="image"
                  src={props?.disclaimerLogo}
                  alt={props?.logoAlt}
                  width="140"
                  height="28"
                />
              )}
              <h4>{props.heading}</h4>
            </div>
            <div
              itemProp="description"
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
            <div className={styles.acceptDisclaimer}>
              <Button
                onClick={() => {
                  props.disclaimerHandler();
                }}
              >
                {props.btnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Disclaimer;
