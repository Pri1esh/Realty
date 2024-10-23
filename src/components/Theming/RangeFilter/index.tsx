import { IRangeFilter } from '@interfaces';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './rangeFilter.module.scss';

const formatPrice = (price: any = 0, decimal = false, local = 'en-IN', currency = 'INR') => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  })
    .format(amount)
    .replace(/\s/g, '');

  // handle decimal
  const finalPrice = !decimal ? formattedPrice.split('.')[0] : formattedPrice;
  if (finalPrice && typeof finalPrice === 'string') {
    return finalPrice?.replace(/ /g, '');
  }

  return finalPrice;
};

const RangeFilter: FC<IRangeFilter> = (props) => {
  // eslint-disable-next-line
  const { min = 0, max = 0, getprice = () => {}, selectedmaxrange = null, selectedminrange = null } = props;
  const [minVal, setMinVal] = useState(selectedminrange ?? +min);
  const [maxVal, setMaxVal] = useState(selectedmaxrange ?? +max);
  const minValRef = useRef(null as any);
  const maxValRef = useRef(null as any);
  const range = useRef(null as any);

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);
  useEffect(() => {
    if (selectedminrange !== null) {
      setMinVal(selectedminrange);
    }
    if (selectedmaxrange !== null) {
      setMaxVal(selectedmaxrange);
    }
  }, [selectedminrange, selectedmaxrange]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  const setPrice = (minPrice: number, maxPrice: number) => {
    const averagePrice = (minPrice + maxPrice) / 2;
    getprice({ minPrice, maxPrice, averagePrice });
  };

  return (
    <div className={styles.rangeWrapper} {...props}>
      <p className={styles.rangeLabel}>{`Average Price Range  -  ${(minVal + maxVal) / 2}`}</p>
      <div className={styles.rangeBox}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            setPrice(value, maxVal);
          }}
          className={`${styles.thumb} ${styles.thumbZindex3}  ${minVal > max - 100 ? styles.thumbZindex5 : ''}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            setPrice(minVal, value);
          }}
          className={`${styles.thumb} ${styles.thumbZindex4}`}
        />
        <div className={styles.slider}>
          <div className={styles.sliderTrack}></div>
          <div ref={range} className={styles.sliderRange}></div>
        </div>
      </div>
      <div className={styles.minMaxRange}>
        <label>
          <p>Min Price</p>
          <span>{formatPrice(minVal)}</span>
        </label>
        <label>
          <p>Max Price</p>
          <span>{formatPrice(maxVal)}</span>
        </label>
      </div>
    </div>
  );
};

export default RangeFilter;
