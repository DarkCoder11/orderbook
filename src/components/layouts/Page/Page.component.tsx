import React from 'react';
import {ToastContainer} from 'react-toastify';

const PageLayout: React.FC = ({children}) => (
  <>
    <main>{children}</main>

    <ToastContainer theme="colored" position="bottom-right" />
  </>
);

export default PageLayout;
