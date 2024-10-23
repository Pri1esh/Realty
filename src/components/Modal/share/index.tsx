import { CustomImage } from '@components';
import { IModalShare } from '@interfaces';
import { getIconFromIconName, timeout } from '@utils';
import { useState } from 'react';
import styles from './share.module.scss';

const Modalshare = (props: IModalShare) => {
  const { modalShare } = props;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    timeout(() => setCopied(false), 3000);
  };

  return (
    <div itemProp="accessibilitySummary" className={styles.shareModal}>
      <ul>
        {modalShare?.src && (
          <li>
            <div className={styles.projectThumb}>
              <CustomImage itemProp="image" src={modalShare?.src} alt={modalShare?.label} />
            </div>
            <ul>
              <li>
                <label itemProp="headline">{modalShare?.label}</label>
                <span itemProp="description">{modalShare?.location}</span>
              </li>
            </ul>
          </li>
        )}
        <li>
          <div itemProp="potentialAction">
            <div className={styles.copyitem}>
              <span onClick={copy}>{getIconFromIconName('Copy')}</span>
              <div onClick={copy} className="mt-2">
                <label className="mt-0" itemProp="text">
                  {!copied ? modalShare?.copylink : 'Copied!'}{' '}
                </label>
              </div>
            </div>
          </div>
          <div>
            <a
              itemProp="potentialAction"
              href={`mailto:?subject=Adani Realty&body=Hi, Checkout this Link ${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{getIconFromIconName('emailhelpdesk')}</span>
            </a>
            <div className="mt-2">
              <a
                itemProp="potentialAction"
                href={`mailto:?subject=Adani Realty&body=Hi, Checkout this Link ${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <label className="mt-0" itemProp="text">
                  {modalShare?.email}
                </label>
              </a>
            </div>
          </div>
        </li>
        <li className={styles.shareIcons}>
          <div className={styles.twitter} itemProp="logo">
            <a
              itemProp="potentialAction"
              href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.twitter}>{getIconFromIconName('TwitterColoured')}</span>
              <label itemProp="text">{modalShare?.twitter}</label>
            </a>
          </div>
          <div className={styles.facebook} itemProp="logo">
            <a
              itemProp="potentialAction"
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.facebook}>{getIconFromIconName('FacebookColoured')}</span>
              <label itemProp="text">{modalShare?.facebook}</label>
            </a>
          </div>
          <div className={styles.whatsapp} itemProp="logo">
            <a
              itemProp="potentialAction"
              href={`https://api.whatsapp.com/send?text=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.whatsapp}>{getIconFromIconName('WhatsappColoured')}</span>
              <label itemProp="text">{modalShare?.whatsapp}</label>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Modalshare;
