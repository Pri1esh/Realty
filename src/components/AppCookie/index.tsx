import { CookiesLayer } from '@components';
import { useEffect, useState } from 'react';
const AppCookie = () => {
  const [showDecline, setshowDecline] = useState<boolean>(true);
  const [cookieDelay, setCookieDelay] = useState(false);
  const getCookie = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  };
  const cookieHandler = () => {
    const setCookie = (name: string) => {
      document.cookie = name + '=accepted; path=/';
    };
    setCookie('realtyPrivacyCookie');
    setshowDecline(false);
  };
  useEffect(() => {
    setTimeout(() => setCookieDelay(true), 20000);
    const hasCookie = getCookie('realtyPrivacyCookie');
    if (hasCookie && hasCookie.length > 0) {
      setshowDecline(false);
    }
  }, []);
  return (
    <>{showDecline && cookieDelay && <CookiesLayer cookieHandler={cookieHandler} setshowDecline={setshowDecline} />}</>
  );
};

export default AppCookie;
