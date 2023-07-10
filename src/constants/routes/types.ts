import {UrlObject} from 'url';

import RoutesConstant from './routes.constant';

export type RouteKeys = keyof typeof RoutesConstant;

export type RouteValues = typeof RoutesConstant[RouteKeys] | UrlObject;
