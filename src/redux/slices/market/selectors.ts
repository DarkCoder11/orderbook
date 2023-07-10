import {createSelector} from '@reduxjs/toolkit';

import {MarketState} from '~/redux/slices/market/types';
import {RootState} from '~/redux/types';

const selectMarket = (state: RootState): MarketState => state.market;

export const selectMarketData = createSelector(selectMarket, (market) => market.data);
