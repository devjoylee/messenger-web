import { User } from 'types/user';
import { GET_USERS } from './types';

export const getUsers = (users: User[]) => ({
  type: GET_USERS,
  payload: users,
});
