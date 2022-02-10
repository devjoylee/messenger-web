export interface User {
  userId: number;
  userName: string;
  profileImage: string;
  content: Content;
  date: string;
}
export type Content = {
  date: number;
  text: string;
};
