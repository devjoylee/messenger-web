import { User } from 'types';
import { UPDATE_CURRENT_USER } from './types';

export const setCurrentUser = (user: User | null) => ({
  type: UPDATE_CURRENT_USER,
  payload: user,
});
