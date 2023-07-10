import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Reducer} from '~/redux/types';

import {MarketState} from './types';

const initialMarketState: MarketState = {
  data: {
    bids: {},
    asks: {},
    priceSnapshot: {},
    orderBookUpdateCount: 0,
  },
} as const;

const marketSlice = createSlice({
  name: Reducer.Market,
  initialState: initialMarketState,
  reducers: {
    setMarketData(state, action: PayloadAction<MarketState['data']>) {
      state.data = {
        ...state.data,
        ...action.payload,
        bids: {
          ...state.data.bids,
          ...action.payload.bids,
        },
        asks: {
          ...state.data.asks,
          ...action.payload.asks,
        },
        priceSnapshot: {
          ...state.data.priceSnapshot,
          ...action.payload.priceSnapshot,
        },
      };
    },
  },
});

export const marketActions = {
  ...marketSlice.actions,
};

export default marketSlice.reducer;
