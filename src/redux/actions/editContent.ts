import { Content } from 'types';
import { EDIT_CONTENT } from './types';

export const updateContent = (content: Content[]) => ({
  type: EDIT_CONTENT,
  payload: content,
});
