import React from 'react';

import {Button} from '~/components';

import styles from './OrderBookTools.module.scss';

type TOrderBookToolsProps = {
  connectionStatus: boolean;
  stopConnection: () => void;
  decrementScale: () => void;
  incrementScale: () => void;
  startConnection: () => void;
  incrementPrecision: () => void;
  decrementPrecision: () => void;
};

const OrderBookTools: React.FC<TOrderBookToolsProps> = ({
  stopConnection,
  decrementScale,
  incrementScale,
  startConnection,
  connectionStatus,
  incrementPrecision,
  decrementPrecision,
}) => (
  <div className={styles.tools}>
    {!connectionStatus ? (
      <Button onClick={startConnection} className={styles.tools__action}>
        Connect
      </Button>
    ) : (
      <Button onClick={stopConnection} className={styles.tools__action}>
        Disconnect
      </Button>
    )}

    <Button onClick={decrementPrecision} className={styles.tools__action}>
      Decrement precision
    </Button>
    <Button onClick={incrementPrecision} className={styles.tools__action}>
      Increment precision
    </Button>

    <Button onClick={decrementScale} className={styles.tools__action}>
      Decrement scale
    </Button>
    <Button onClick={incrementScale} className={styles.tools__action}>
      Increment scale
    </Button>
  </div>
);

export default OrderBookTools;
