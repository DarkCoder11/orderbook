import Router from 'next/router';
import {Url} from 'url';

import {Routes, RouteValues} from '~/constants';
import {RouterTransitionOptions} from '~/types';

const RouterService = {
  back: (): void => Router.back(),
  push: async (
    route: RouteValues | Url,
    as?: Url | string,
    options?: RouterTransitionOptions,
  ): Promise<boolean> => {
    return await Router.push(route, as, options);
  },
  pushError: async (): Promise<boolean> => {
    return await Router.push(Routes.Error as string);
  },
};

export default RouterService;
