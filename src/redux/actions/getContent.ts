import { Context } from 'types';
import { GET_CONTENT } from './types';

export const getContent = (content: Context) => ({
  type: GET_CONTENT,
  payload: content,
});
