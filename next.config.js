const {resolve} = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [resolve(__dirname, 'src/styles')],
    prependData: `@import "resources.scss";`,
  },
  env: {
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
  },
  async headers() {
    return [
      {
        source: '/fonts/Roboto-Regular.ttf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/Roboto-Medium.ttf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/Roboto-Bold.ttf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });

    return config;
  },
};

module.exports = nextConfig;
