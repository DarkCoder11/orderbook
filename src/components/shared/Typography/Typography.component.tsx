import classNames from 'classnames';
import React from 'react';

import {TypographyProps} from './types';
import styles from './Typography.module.scss';

const Typography = ({
  capitalize,
  children = '',
  tagName = 'span',
  variant,
  type,
  align,
  className = '',
  ...rest
}: TypographyProps): JSX.Element => {
  const Tag = tagName;
  const alignKey = align && `typography__align_${align}`;
  const fontKey = variant && type && `typography__${variant}_${type}`;

  const classes = classNames(alignKey, fontKey, {
    [className]: className,
    [styles.container_capitalized]: capitalize,
  });

  return (
    <Tag {...rest} className={classes.length ? classes : undefined}>
      {children}
    </Tag>
  );
};

export default Typography;
