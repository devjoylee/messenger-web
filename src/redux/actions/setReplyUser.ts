import { User } from 'types';
import { SET_REPLY_USER } from './types';

export const setReplyUser = (user: User | null) => ({
  type: SET_REPLY_USER,
  payload: user,
});
