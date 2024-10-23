import { useEffect } from 'react';
import styles from './FacebookFeed.module.scss';
const FacebookFeed = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        if (typeof window === 'undefined' || window.scrollY < 20) return;
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0';
        script.async = true;
        script.defer = true;
        script.nonce = 'KNgYnwQ6';
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  return typeof window !== 'undefined' && window.scrollY > 15 ? (
    <div className={styles.facebookGrid} itemScope itemType="https://schema.org/SocialMediaPosting">
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/adanirealty"
        data-tabs="timeline"
        data-width="410"
        data-height="490"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite="https://www.facebook.com/adanirealty" className="fb-xfbml-parse-ignore">
          <a itemProp="license" href="https://www.facebook.com/adanirealty">
            Adani Realty
          </a>
        </blockquote>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default FacebookFeed;
