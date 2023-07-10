import {combineReducers} from '@reduxjs/toolkit';

import market from './market/slice';

export const slices = combineReducers({
  market,
});

export * from './market';
