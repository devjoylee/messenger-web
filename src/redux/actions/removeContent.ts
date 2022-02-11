import { Content } from 'types';
import { REMOVE_CONTENT } from './types';

export const removeContent = (content: Content[]) => ({
  type: REMOVE_CONTENT,
  payload: content,
});
