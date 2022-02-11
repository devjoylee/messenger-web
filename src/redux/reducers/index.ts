import { combineReducers } from 'redux';
import auth from './auth';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
