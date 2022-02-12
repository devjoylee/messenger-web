import { ReplyUser } from 'types';
import { SET_REPLY_CONTENT } from './types';

export const setReplyContent = (replyObj: ReplyUser | null) => ({
  type: SET_REPLY_CONTENT,
  payload: replyObj,
});
