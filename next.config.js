/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const path = require('path');

const { DefinePlugin } = require('webpack');

const ENV_TYPE = process.env.NODE_ENV;

require('dotenv').config({ path: ENV_TYPE === 'dev' ? '.env.dev' : `.env.${ENV_TYPE}` });

const withImages = require('next-images');

// Git version
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  lightweightTags: true,
});

const gitVersion = (() => {
  try {
    return JSON.stringify(gitRevisionPlugin.version());
  } catch (e) {
    return JSON.stringify(require('./package.json').version);
  }
})();

const requestSecurityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self'`,
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

const nextConfig = {
  publicRuntimeConfig: {
    baseImagePath: '/',
  },
  images: {
    domains: [
      'https://10.81.211.209/',
      'https://web-dev.adanidigitallabs.com/',
      'https://web-uat.adanidigitallabs.com/',
      'https://uat.adanirealty.com',
      'https://www.adanirealty.com',
      'http://web-dev.uat.adanirealty.com/',
      'http://web.uat.adanirealty.com/',
      'http://www.uat.adanirealty.com/',
      '10.81.211.75',
      'adani-uat-reality-cd.adani.com',
      'adani-uat-reality-cm.adani.com',
      'sitecorecd.uat.adanirealty.com',
      'sitecorecd.adanirealty.com',
      'web-dev.uat.adanirealty.com',
      'web.uat.adanirealty.com',
      'www.uat.adanirealty.com',
    ],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    path: '/_next/image',
  },
  reactStrictMode: true,
  // https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, { buildId }) => {
    config.plugins = config.plugins.concat([
      new DefinePlugin({
        __VERSION__: JSON.stringify(require('./package.json').version),
        __GIT_VERSION__: gitVersion,
        __BUILD_TIME__: new Date().getTime(),
        __BUILD_ID__: buildId,
        __EXPLORE_SHANTIGRAM__: process.env.NEXT_PUBLIC_EXPLORE_SHANTIGRAM,
        __RECAPTCHA__: process.env.NEXT_PUBLIC_RECAPTCHA,
      }),
    ]);
    // Important: return the modified config
    return config;
  },

  async redirects() {
    return [
      {
        source: '/township',
        destination: '/township/shantigram-ahmedabad',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      { source: '/:slug*-pcic', destination: '/location/[id]-pcic' },
      { source: '/:slug*-cpic', destination: '/location/[id]-cpic' },
      { source: '/:slug*-psic', destination: '/location/[id]-psic' },
      { source: '/:slug*-ptic', destination: '/location/[id]-ptic' },
      { source: '/location/:slugs', destination: '/404' },
      { source: '/:slugs', destination: '/location/:slugs' },
      { source: '/blogs/:slugs', destination: '/blogs/:slugs/:slugs' },
      { source: '/blogs/category/:slugs', destination: '/blogs/:slugs' },
    ];
  },
  devIndicators: {
    buildActivity: false,
  },
};

const images = withImages();
module.exports = {
  compiler: {
    removeConsole: false,
  },
  images,
  async headers() {
    return [
      {
        // Applied on All Routes
        source: '/:path*',
        headers: requestSecurityHeaders,
      },
    ];
  },
  ...nextConfig,
};

if (process.env.ENV && process.env.ENV != 'dev') {
  const { withSentryConfig } = require('@sentry/nextjs');
  module.exports = withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,

      org: 'sentry',
      project: 'javascript-nextjs-realty-ui',
      url: 'https://sentrydev.adanione.cloud/',
      authToken: 'a8c290b5f5284620b8e903394734aad6969659dae9dd48f1919d62e3acb820ed',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: false,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: false,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      // tunnelRoute: "/monitoring",

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      // disableLogger: true,
    },
  );
}
