import {useDispatch} from 'react-redux';

import {AppDispatch} from '~/redux/types';

const useAppDispatch = (): AppDispatch => {
  return useDispatch<AppDispatch>();
};

export default useAppDispatch;
