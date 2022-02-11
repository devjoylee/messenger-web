import {
  GET_USERS,
  SET_REPLY_USER,
  UPDATE_CURRENT_USER,
} from 'redux/actions/types';

const initialState = { users: [], currentUser: null, toReply: null };

export default function auth(state = initialState, action: any) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_REPLY_USER:
      return { ...state, toReply: action.payload };
    default:
      return state;
  }
}
