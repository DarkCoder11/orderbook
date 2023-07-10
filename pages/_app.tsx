import '~/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from 'next/app';
import React from 'react';

import {reduxWrapper} from '~/redux';

const HrantOrderBookApp = ({Component, pageProps}: AppProps): JSX.Element => (
  <>
    <Component {...pageProps} />
  </>
);

export default reduxWrapper.withRedux(HrantOrderBookApp);
