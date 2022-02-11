import { Content } from 'types';
import { GET_CONTENT } from './types';

export const getContent = (content: Content) => ({
  type: GET_CONTENT,
  payload: content,
});
