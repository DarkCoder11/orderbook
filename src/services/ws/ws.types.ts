export type TPricePoint = {
  cnt: number;
  price: number;
  amount: number;
  total: number;
};

export type TBidsAsks = {
  bids: Record<string, TPricePoint>;
  asks: Record<string, TPricePoint>;
};

export type TBook = {
  orderBookUpdateCount: number;
  priceSnapshot: Record<string, string[]>;
} & TBidsAsks;

export type TWSService = {
  connected: boolean;
  wsConnect: (args: TWsConnectParams) => void;
};

export type TWsConnectParams = {
  connectionStatus: boolean;
  saveBook: (book: TBook) => void;
  setConnectionStatus: (status: boolean) => void;
};
