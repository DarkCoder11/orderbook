import {useRouter} from 'next/router';
import {DefaultSeo} from 'next-seo';
import React from 'react';

import {DefaultMetaSettings, Routes} from '~/constants';

import {SeoLayoutProps} from './types';

const SeoLayout: React.FC<SeoLayoutProps> = ({title, children, metaDescription}) => {
  const router = useRouter();

  const asPath = router.asPath === Routes.Dashboard ? '' : router.asPath;
  const url = `${DefaultMetaSettings.domain}${asPath}`;
  const openGraph = {
    url,
    type: 'website',
    site_name: DefaultMetaSettings.name,
    description: DefaultMetaSettings.description,
  };

  return (
    <>
      <DefaultSeo
        title={title}
        canonical={url}
        openGraph={openGraph}
        description={metaDescription}
        defaultTitle={DefaultMetaSettings.name}
        titleTemplate={`%s | ${DefaultMetaSettings.name}`}
      />

      {children}
    </>
  );
};

export default SeoLayout;
