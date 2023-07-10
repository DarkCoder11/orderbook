import React from 'react';

import {Link, Typography} from '~/components';
import {Routes} from '~/constants';

import styles from './Error.module.scss';

const ErrorContainer: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.container__title}>404</h1>

    <Typography tagName="h4" className={styles.container__text}>
      Page not found
    </Typography>
    <Link to={Routes.Dashboard} className={styles.container__btn}>
      Home
    </Link>
  </div>
);

export default ErrorContainer;
