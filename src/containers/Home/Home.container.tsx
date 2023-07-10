import classNames from 'classnames';
import {isEmpty, throttle} from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Header, Typography} from '~/components';
import {OrderBook} from '~/components/views/OrderBook';
import OrderBookTools from '~/components/views/OrderBookTools/OrderBookTools.component';
import {useAppSelector} from '~/hooks';
import {marketActions, marketSelectors} from '~/redux';
import {TBidsAsks, WSService} from '~/services';

import styles from './Home.module.scss';

const PRECISION = ['P0', 'P1'];

const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const {asks, bids} = useAppSelector(marketSelectors.selectMarketData);

  const [scale, setScale] = useState(1.0);
  const [precision, setPrecision] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState(true);

  const [expanded, setExpanded] = useState(true);

  const containerClasses = classNames(styles.container, {[styles.container__expand]: expanded});

  const finalPrecision = precision % PRECISION.length;

  const modifiedAsks = useMemo(() => {
    if (!asks) return null;

    return Object.keys(asks)
      .slice(0, 21)
      .reduce<TBidsAsks['asks']>((acc, k, i) => {
        const total = Object.keys(asks)
          .slice(0, i + 1)
          .reduce((t, key) => {
            t += asks[key].amount;
            return t;
          }, 0);
        const item = asks[k];
        acc[k] = {...item, total};
        return acc;
      }, {});
  }, [asks]);

  const maxAsksTotal = useMemo(() => {
    if (!modifiedAsks) return 0;

    return Object.keys(modifiedAsks).reduce<number>((t, key) => {
      if (t < modifiedAsks[key]?.total) {
        return modifiedAsks[key]?.total;
      } else {
        return t;
      }
    }, 0);
  }, [modifiedAsks]);

  const modifiedBids = useMemo(() => {
    if (!bids) return null;

    return Object.keys(bids)
      .slice(0, 21)
      .reduce<TBidsAsks['bids']>((acc, k, i) => {
        const total = Object.keys(bids)
          .slice(0, i + 1)
          .reduce((t, key) => {
            t += bids[key].amount;
            return t;
          }, 0);
        const item = bids[k];
        acc[k] = {...item, total};
        return acc;
      }, {});
  }, [bids]);

  const maxBidsTotal = useMemo(() => {
    if (!modifiedBids) return 0;

    return Object.keys(modifiedBids).reduce<number>((acc, key) => {
      if (acc < modifiedBids[key].total) {
        return modifiedBids[key].total;
      } else {
        return acc;
      }
    }, 0);
  }, [modifiedBids]);

  const decScale = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const incScale = () => {
    setScale((prevScale) => prevScale - 0.1);
  };

  const decPrecision = () => {
    if (precision > 0) {
      setPrecision((prevPrecision) => (prevPrecision + PRECISION.length - 1) % PRECISION.length);
    }
  };

  const incPrecision = () => {
    if (precision < 4) {
      setPrecision((prevPrecision) => (prevPrecision + 1) % PRECISION.length);
    }
  };

  const startConnection = () => {
    if (!connectionStatus) {
      setConnectionStatus(true);
    }
  };

  const stopConnection = () => {
    if (connectionStatus) {
      setConnectionStatus(false);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveBook = useCallback(
    throttle((b) => dispatch(marketActions.setMarketData(b)), 500),
    [],
  );

  useEffect(() => {
    WSService.wsConnect({saveBook, setConnectionStatus, connectionStatus});
  }, [saveBook, setConnectionStatus, connectionStatus]);

  return (
    <section>
      <div className="container">
        <Header />

        <div className={styles.container__book}>
          <div className={containerClasses}>
            <Typography tagName="h3" onClick={toggleExpanded}>
              Order Book <Typography>BTC/USD</Typography>
            </Typography>

            <OrderBookTools
              incrementScale={incScale}
              decrementScale={decScale}
              stopConnection={stopConnection}
              incrementPrecision={incPrecision}
              decrementPrecision={decPrecision}
              startConnection={startConnection}
              connectionStatus={connectionStatus}
            />
          </div>

          {isEmpty(modifiedAsks) ? (
            <div>...Loading</div>
          ) : (
            <OrderBook
              prec={finalPrecision}
              scale={scale}
              asks={modifiedAsks}
              bids={modifiedBids}
              expanded={expanded}
              maxBidsTotal={maxBidsTotal}
              maxAsksTotal={maxAsksTotal}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
