import * as Reducers from './reducers/reducers';
import Actions from './actions/actions';
import * as Types from './types';

const User = {
  reducers: { ...Reducers },
  Actions,
  types: { ...Types },
};

export default User;
