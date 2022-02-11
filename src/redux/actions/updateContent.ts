import { Content } from 'types';
import { UPDATE_CONTENT } from './types';

export const updateContent = (content: Content[]) => ({
  type: UPDATE_CONTENT,
  payload: content,
});
