import {
  EDIT_CONTENT,
  GET_CONTENT,
  GET_USERS,
  REMOVE_CONTENT,
  SET_REPLY_CONTENT,
  UPDATE_CONTENT,
  UPDATE_CURRENT_USER,
} from 'redux/actions/types';

export interface User {
  userId: number;
  userName: string;
  profileImage: string;
  docId: string;
}

export interface Content {
  date: number;
  text: string;
  userId: number;
  uuid: string;
}

export interface ReplyUser {
  content: Content;
  userName: string;
}

// auth

export interface GetUserAction {
  type: typeof GET_USERS;
  payload: User[];
}
export interface UpdateCurrentUserAction {
  type: typeof UPDATE_CURRENT_USER;
  payload: User | null;
}
export interface AuthState {
  users: User[] | [];
  currentUser: User | null;
}

// content

export interface ContentState {
  content: Content[] | [];
  replyObj: ReplyUser | null;
}

export interface GetContentAction {
  type: typeof GET_CONTENT;
  payload: Content[];
}
export interface RemoveContentAction {
  type: typeof REMOVE_CONTENT;
  payload: Content[];
}
export interface UpdateContentAction {
  type: typeof UPDATE_CONTENT;
  payload: Content[];
}
export interface EditContentAction {
  type: typeof EDIT_CONTENT;
  payload: Content[];
}
export interface SetReplyContentAction {
  type: typeof SET_REPLY_CONTENT;
  payload: ReplyUser | null;
}

export type ContentAction =
  | GetContentAction
  | RemoveContentAction
  | UpdateContentAction
  | EditContentAction
  | SetReplyContentAction;
