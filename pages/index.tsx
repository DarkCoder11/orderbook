import type {NextPage} from 'next';

import {PageLayout, SeoLayout} from '~/components';
import {HomeMetaSettings} from '~/constants';
import {HomeContainer} from '~/containers';

const HomePage: NextPage = () => (
  <SeoLayout title={HomeMetaSettings.title} metaDescription={HomeMetaSettings.description}>
    <PageLayout>
      <HomeContainer />
    </PageLayout>
  </SeoLayout>
);

export default HomePage;
