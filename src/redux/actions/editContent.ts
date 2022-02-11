import { Content } from 'types';
import { EDIT_CONTENT } from './types';

export const editContent = (content: Content[]) => ({
  type: EDIT_CONTENT,
  payload: content,
});
