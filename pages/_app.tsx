import { AppInsightsContextProvider } from '@context';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import useGTM from 'src/utils/useGTM';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const { loadScript } = useGTM();

  let autoPopup: any;
  let arya: any;
  let interval: any;
  let chatWindow: any;
  if (typeof window !== 'undefined') {
    interval = setInterval(() => {
      arya = document.querySelector('#ymPluginDivContainerInitial #ymDivBar');
      chatWindow = document.querySelector('#ymPluginDivContainerInitial #ymFrameHolder');
      autoPopup = document.querySelector('#ymPluginDivContainerInitial #ym-auto-pop-up-container');
      if (arya) {
        clearInterval(interval);
      }
    }, 1000);
  }

  useEffect(() => {
    window.onscroll = function () {
      const viewportHt = window.innerHeight;
      const position = window.scrollY;
      if (arya && chatWindow.style.display === 'none') {
        if (position > viewportHt) {
          arya?.setAttribute('class', 'show');
          autoPopup?.setAttribute('class', 'show');
        } else {
          arya?.setAttribute('class', 'hide');
          autoPopup?.setAttribute('class', 'hide');
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arya]);

  useEffect(() => {
    loadScript(process.env.NEXT_PUBLIC_GTM_ID);
    getAryaScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAryaScript = () => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.scrollY > 20) {
        const scriptVal = `
        window.ymConfig={"bot":"x1568125917603","host":'https://cloud.yellow.ai',"payload":{}};(function () {var w=window,ic=w.YellowMessenger;if("function"===typeof ic)ic("reattach_activator"),ic("update",ymConfig);else{var d=document,i=function(){i.c(arguments)};function l(){var e=d.createElement("script");e.type="text/javascript",e.async=!0,e.src='https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js';var t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}i.q=[],i.c=function(e){i.q.push(e)},w.YellowMessenger=i,l()}})();
      `;
        clearInterval(interval);
        const script = document.createElement('script');
        script.innerHTML = scriptVal;
        script.id = 'ym';
        document.body.appendChild(script);
      }
    }, 1000);
  };

  const app = () => (
    <AppInsightsContextProvider>
      <Component {...pageProps} />
    </AppInsightsContextProvider>
  );
  return (
    <>
      <SSRProvider>{app()}</SSRProvider>
    </>
  );
}

export default MyApp;
