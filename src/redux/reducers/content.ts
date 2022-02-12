import {
  GET_CONTENT,
  UPDATE_CONTENT,
  EDIT_CONTENT,
  REMOVE_CONTENT,
  SET_REPLY_CONTENT,
} from 'redux/actions/types';
import { ContentAction, ContentState } from 'types';

const initialState = { content: [], replyObj: null };

export default function content(
  state: ContentState = initialState,
  action: ContentAction
) {
  switch (action.type) {
    case GET_CONTENT:
      return { ...state, content: action.payload };
    case REMOVE_CONTENT:
      return { ...state, content: action.payload };
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case EDIT_CONTENT:
      return { ...state, content: action.payload };
    case SET_REPLY_CONTENT:
      return { ...state, replyObj: action.payload };
    default:
      return state;
  }
}
