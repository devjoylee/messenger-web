import { User } from 'types/user';
import { UPDATE_CURRENT_USER } from './types';

export const setCurrentUser = (user: User) => ({
  type: UPDATE_CURRENT_USER,
  payload: user,
});
