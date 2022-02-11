import { GET_CONTENT, EDIT_CONTENT } from 'redux/actions/types';

const initialState = { content: [] };

export default function content(state = initialState, action: any) {
  switch (action.type) {
    case GET_CONTENT:
      return { ...state, content: action.payload };
    case EDIT_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}
