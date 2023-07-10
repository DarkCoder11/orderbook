import classNames from 'classnames';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Typography} from '~/components';
import {TBidsAsks} from '~/services';

import styles from './OrderBook.module.scss';
import {formatNumberWithCommas} from './OrderBook.utils';

type TOrderBookProps = {
  prec: number;
  scale: number;
  expanded: boolean;
  maxAsksTotal: number;
  maxBidsTotal: number;
  asks: TBidsAsks['asks'] | null;
  bids: TBidsAsks['bids'] | null;
};

const OrderBook: React.FC<TOrderBookProps> = ({
  asks,
  bids,
  expanded,
  maxAsksTotal,
  maxBidsTotal,
  scale,
  prec,
}) => {
  const countWidthRef = useRef<HTMLLIElement | null>(null);
  const amountWidthRef = useRef<HTMLLIElement | null>(null);
  const totalWidthRef = useRef<HTMLLIElement | null>(null);
  const priceWidthRef = useRef<HTMLLIElement | null>(null);

  const [stateWidth, setStateWidth] = useState({
    countWidth: 0,
    amountWidth: 0,
    totalWidth: 0,
    priceWidth: 0,
  });

  const expandableClasses = classNames(styles.container__expandable, {
    [styles.container__expandable_open]: expanded,
  });

  const renderBids = useMemo(
    () =>
      bids
        ? Object.keys(bids).map((k) => {
            const item = bids[k];
            const {cnt, amount, price, total} = item;
            const percentage = (total * 100) / (maxBidsTotal * scale);
            return (
              <ul
                key={`book-${cnt}${amount}${price}${total}`}
                className={styles.container__expandable_box_row}>
                <li
                  className={styles.container__expandable_box_indicator}
                  style={{
                    width: `${percentage > 100 ? 100 : percentage}%`,
                  }}
                />
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth?.countWidth}}>
                  <Typography>{cnt}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth?.amountWidth}}>
                  <Typography>{amount.toFixed(2)}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth?.totalWidth}}>
                  <Typography>{total.toFixed(2)}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth?.priceWidth}}>
                  <Typography>{formatNumberWithCommas(Number(price.toFixed(prec)))}</Typography>
                </li>
              </ul>
            );
          })
        : null,
    [
      bids,
      maxBidsTotal,
      prec,
      scale,
      stateWidth?.amountWidth,
      stateWidth?.countWidth,
      stateWidth?.priceWidth,
      stateWidth?.totalWidth,
    ],
  );

  const renderAsks = useMemo(
    () =>
      asks
        ? Object.keys(asks).map((k, i) => {
            const item = asks[k];
            const {cnt, amount, price, total} = item;
            const percentage = (total * 100) / (maxAsksTotal * scale);
            return (
              <ul key={i} className={styles.container__expandable_box_row}>
                <li
                  className={styles.container__expandable_box_indicator_right}
                  style={{
                    width: `${percentage > 100 ? 100 : percentage}%`,
                  }}
                />
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth.priceWidth}}>
                  <Typography>{formatNumberWithCommas(Number(price.toFixed(prec)))}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth.totalWidth}}>
                  <Typography>{total.toFixed(2)}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth.amountWidth}}>
                  <Typography>{amount.toFixed(2)}</Typography>
                </li>
                <li
                  className={styles.container__expandable_box_title}
                  style={{width: stateWidth.countWidth}}>
                  <Typography>{cnt}</Typography>
                </li>
              </ul>
            );
          })
        : null,
    [
      asks,
      maxAsksTotal,
      prec,
      scale,
      stateWidth?.amountWidth,
      stateWidth?.countWidth,
      stateWidth?.priceWidth,
      stateWidth?.totalWidth,
    ],
  );

  useEffect(() => {
    setStateWidth({
      countWidth: countWidthRef.current?.offsetWidth || 0,
      amountWidth: amountWidthRef.current?.offsetWidth || 0,
      totalWidth: totalWidthRef.current?.offsetWidth || 0,
      priceWidth: priceWidthRef.current?.offsetWidth || 0,
    });
  }, []);

  return (
    <div className={expandableClasses}>
      <div className={styles.container__expandable_box}>
        <ul className={styles.container__expandable_box_row}>
          <li className={styles.container__expandable_box_title} ref={countWidthRef}>
            Count
          </li>
          <li className={styles.container__expandable_box_title} ref={amountWidthRef}>
            Amount
          </li>
          <li className={styles.container__expandable_box_title} ref={totalWidthRef}>
            Total
          </li>
          <li className={styles.container__expandable_box_title} ref={priceWidthRef}>
            Price
          </li>
        </ul>
        <div>{renderBids}</div>
      </div>
      <div className={styles.container__expandable_box}>
        <ul className={styles.container__expandable_box_row}>
          <li className={styles.container__expandable_box_title}>Price</li>
          <li className={styles.container__expandable_box_title}>Total</li>
          <li className={styles.container__expandable_box_title}>Amount</li>
          <li className={styles.container__expandable_box_title}>Count</li>
        </ul>
        <div>{renderAsks}</div>
      </div>
    </div>
  );
};

export default OrderBook;
