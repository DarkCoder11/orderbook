import React from 'react';

import {Typography} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <Typography variant="heading" type="semibold" tagName="h1">
      Hrant Order Book
    </Typography>
  </header>
);

export default Header;
