import {each} from 'lodash';

import {TBook, TWsConnectParams, TWSService} from './ws.types';

let BOOK: TBook = {
  bids: {},
  asks: {},
  priceSnapshot: {
    asks: [],
    bids: [],
  },
  orderBookUpdateCount: 0,
};
let connected = false;
let connecting = false;
let socketClient: WebSocket;
let sequenceNumber: number | null = null;
const channels: Record<string, number> = {};

const handleBookMessage = (msg: MessageEvent['data'], saveBook: (book: TBook) => void) => {
  if (msg[1] === 'hb') {
    sequenceNumber = +msg[2];
    return;
  } else if (msg[1] === 'cs') {
    sequenceNumber = +msg[3];
    return;
  }

  if (BOOK.orderBookUpdateCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    each(msg[1], (pp: any) => {
      pp = {price: pp[0], cnt: pp[1], amount: pp[2]};
      const side = pp.amount >= 0 ? 'bids' : 'asks';
      pp.amount = Math.abs(pp.amount);
      BOOK[side][pp.price] = pp;
    });
  } else {
    const currentSequenceNumber = +msg[2];
    msg = msg[1];

    if (!sequenceNumber) {
      sequenceNumber = currentSequenceNumber - 1;
    }

    sequenceNumber = currentSequenceNumber;

    const pp = {price: msg[0], cnt: msg[1], amount: msg[2], total: msg[1]};

    if (!pp.cnt) {
      if (pp.amount > 0) {
        if (BOOK['bids'][pp.price]) {
          delete BOOK['bids'][pp.price];
        }
      } else if (pp.amount < 0) {
        if (BOOK['asks'][pp.price]) {
          delete BOOK['asks'][pp.price];
        }
      }
    } else {
      const side = pp.amount >= 0 ? 'bids' : 'asks';
      pp.amount = Math.abs(pp.amount);
      BOOK[side][pp.price] = pp;
    }
  }

  each(['bids', 'asks'], (side: 'bids' | 'asks') => {
    const sBook = BOOK[side];
    const bPrices = Object.keys(sBook);

    const prices = bPrices.sort(function (a, b) {
      if (side === 'bids') {
        return +a >= +b ? -1 : 1;
      } else {
        return +a <= +b ? -1 : 1;
      }
    });

    BOOK.priceSnapshot[side] = prices;
  });

  BOOK.orderBookUpdateCount++;
  saveBook({...BOOK});
};

const wsConnect = ({saveBook, setConnectionStatus, connectionStatus}: TWsConnectParams) => {
  if (!connecting && !connected) {
    socketClient = new WebSocket(process.env.WEBSOCKET_URL as string, 'protocolOne');
  }

  if (!connectionStatus) {
    socketClient.close();
    return;
  }

  if (connecting || connected) return;

  connecting = true;

  socketClient.onopen = () => {
    // eslint-disable-next-line no-console
    console.log('WS open 📖');
    connecting = false;
    connected = true;
    setConnectionStatus(true);
    BOOK = {bids: {}, asks: {}, priceSnapshot: {asks: [], bids: []}, orderBookUpdateCount: 0};
    socketClient.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        pair: 'BTCUSD',
        prec: 'P0',
        len: 25,
        freq: 'F0',
      }),
    );
  };

  socketClient.onclose = () => {
    sequenceNumber = null;
    // eslint-disable-next-line no-console
    console.log('WS close 🔒');
    connecting = false;
    connected = false;
    setConnectionStatus(false);
  };

  socketClient.onmessage = (messageEvent: MessageEvent) => {
    const msg = JSON.parse(messageEvent.data as string);
    if (msg.event === 'subscribed') {
      channels[msg.channel] = msg.chanId;
      // eslint-disable-next-line no-console
      console.log({channels});
    }

    if (msg.event) return;

    if (msg[0] === channels['book']) {
      handleBookMessage(msg, saveBook);
    }
  };
};

const WSService: TWSService = {
  connected,
  wsConnect,
};

export default WSService;
