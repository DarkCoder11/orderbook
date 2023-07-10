import type {NextPage} from 'next';

import {SeoLayout} from '~/components';
import {ErrorMetaSettings} from '~/constants';
import {ErrorContainer} from '~/containers';

const NotFoundPage: NextPage = () => (
  <SeoLayout title={ErrorMetaSettings.title} metaDescription={ErrorMetaSettings.description}>
    <ErrorContainer />
  </SeoLayout>
);

export default NotFoundPage;
