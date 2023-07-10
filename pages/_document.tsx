import {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

const HrantOrderBookDocument: React.FC = () => (
  <Html lang="en">
    <Head>
      <meta name="author" content="Hrant" />
      <meta name="theme-color" content="#172d3e" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Hrant order book Admin" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="320x320" href="/favicon/metaImg.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default HrantOrderBookDocument;
