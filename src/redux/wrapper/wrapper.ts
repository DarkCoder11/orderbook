import {createWrapper} from 'next-redux-wrapper';

import {Store} from '..';
import {store} from '../store';

const makeStore = (): Store => store;

const reduxWrapper = createWrapper<Store>(makeStore);

export default reduxWrapper;
