import { combineReducers } from 'redux';
import auth from './auth';
import content from './content';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth,
  content,
});

export default rootReducer;
