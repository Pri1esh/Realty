/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable @next/next/next-script-for-ga */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import packageJSON from '../package.json';
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }
  appTime = new Date();
  getTime = (d: Date) => {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.toString().substring(16, 24);
  };

  // at -> application Time, st -> serve Time
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          data-at={this.getTime(this.appTime)}
          data-st={this.getTime(new Date())}
          data-version={packageJSON?.version}
          data-aks-tag={process.env.AKS_TAG}
        >
          <noscript>
            <iframe
              sandbox={''}
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
